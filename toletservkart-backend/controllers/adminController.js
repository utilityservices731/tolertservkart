exports.getDashboardData = (req, res) => {
  res.json({
    totalUsers: 1250,
    activeListings: 435,
    pendingRequests: 23,
    newMessages: 7,
    recentActivities: [
      "User JohnDoe registered",
      "New property listing uploaded",
      "Owner request approved",
      "Admin updated system settings"
    ]
  });
};
