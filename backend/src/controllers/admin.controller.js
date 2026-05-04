const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

/** Profit per line: (sale price - product costPrice) × qty */
async function profitByDaySince(startDate, groupByDayOfWeek = false) {
  const groupId = groupByDayOfWeek
    ? { $dayOfWeek: '$createdAt' }
    : { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } };

  const rows = await Order.aggregate([
    { $match: { createdAt: { $gte: startDate }, status: { $ne: 'cancelled' } } },
    { $unwind: '$items' },
    {
      $lookup: {
        from: 'products',
        localField: 'items.product',
        foreignField: '_id',
        as: 'pd',
      },
    },
    { $unwind: { path: '$pd', preserveNullAndEmptyArrays: true } },
    {
      $group: {
        _id: groupId,
        profit: {
          $sum: {
            $multiply: [
              {
                $max: [
                  0,
                  {
                    $subtract: ['$items.price', { $ifNull: ['$pd.costPrice', 0] }],
                  },
                ],
              },
              '$items.quantity',
            ],
          },
        },
      },
    },
    { $sort: { _id: 1 } },
  ]);
  return rows;
}

function mapRows(rows) {
  const m = {};
  rows.forEach((r) => {
    m[r._id] = r;
  });
  return m;
}

/** Fill each calendar day in current month up to today */
function fillMonthlySeries(year, monthIndex, ordersRows, profitRows) {
  const oMap = mapRows(ordersRows);
  const pMap = mapRows(profitRows);
  const today = new Date();
  const lastDay =
    year === today.getFullYear() && monthIndex === today.getMonth()
      ? today.getDate()
      : new Date(year, monthIndex + 1, 0).getDate();

  const out = [];
  for (let d = 1; d <= lastDay; d += 1) {
    const key = `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
    const o = oMap[key] || {};
    const p = pMap[key] || {};
    out.push({
      label: `${d}`,
      date: key,
      orders: o.orders || 0,
      revenue: o.revenue || 0,
      profit: p.profit || 0,
    });
  }
  return out;
}

const DOW_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

/** Mongo $dayOfWeek: 1=Sunday … 7=Saturday */
function fillWeeklySeries(ordersRows, profitRows) {
  const oMap = mapRows(ordersRows);
  const pMap = mapRows(profitRows);
  const out = [];
  for (let dow = 1; dow <= 7; dow += 1) {
    const o = oMap[dow] || {};
    const p = pMap[dow] || {};
    out.push({
      label: DOW_LABELS[dow - 1],
      dow,
      orders: o.orders || 0,
      revenue: o.revenue || 0,
      profit: p.profit || 0,
    });
  }
  return out;
}

/**
 * Dashboard: KPIs + filled monthly/weekly series (orders, revenue, profit).
 * GET /api/admin/dashboard
 */
exports.dashboard = async (_req, res) => {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);

    const [totalRevenueAgg, totalProfitAgg, totalOrders, totalUsers, totalProducts] = await Promise.all([
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $group: { _id: null, sum: { $sum: '$total' } } },
      ]),
      Order.aggregate([
        { $match: { status: { $ne: 'cancelled' } } },
        { $unwind: '$items' },
        {
          $lookup: {
            from: 'products',
            localField: 'items.product',
            foreignField: '_id',
            as: 'pd',
          },
        },
        { $unwind: { path: '$pd', preserveNullAndEmptyArrays: true } },
        {
          $group: {
            _id: null,
            sum: {
              $sum: {
                $multiply: [
                  {
                    $max: [
                      0,
                      {
                        $subtract: ['$items.price', { $ifNull: ['$pd.costPrice', 0] }],
                      },
                    ],
                  },
                  '$items.quantity',
                ],
              },
            },
          },
        },
      ]),
      Order.countDocuments(),
      User.countDocuments({ role: 'user' }),
      Product.countDocuments({ isActive: true }),
    ]);

    const totalRevenue = totalRevenueAgg[0]?.sum || 0;
    const totalProfit = totalProfitAgg[0]?.sum || 0;

    const monthlyOrders = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfMonth } } },
      {
        $group: {
          _id: { $dateToString: { format: '%Y-%m-%d', date: '$createdAt' } },
          orders: { $sum: 1 },
          revenue: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const weeklyOrders = await Order.aggregate([
      { $match: { createdAt: { $gte: startOfWeek } } },
      {
        $group: {
          _id: { $dayOfWeek: '$createdAt' },
          orders: { $sum: 1 },
          revenue: { $sum: '$total' },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const [monthlyProfit, weeklyProfit] = await Promise.all([
      profitByDaySince(startOfMonth, false),
      profitByDaySince(startOfWeek, true),
    ]);

    const monthly = fillMonthlySeries(now.getFullYear(), now.getMonth(), monthlyOrders, monthlyProfit);
    const weekly = fillWeeklySeries(weeklyOrders, weeklyProfit);

    res.json({
      totalRevenue,
      totalProfit,
      totalOrders,
      totalUsers,
      totalProducts,
      monthly,
      weekly,
    });
  } catch (e) {
    res.status(500).json({ message: e.message || 'Dashboard failed' });
  }
};
