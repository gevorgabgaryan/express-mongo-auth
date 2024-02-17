module.exports = {
  async up(db, client) {
    const adminUserId = "65d087da3b25f6c6125f6864";
    await db.collection('products').updateMany({}, {
      $set: { userId: adminUserId, isSold: false }
    });
  },

  async down(db, client) {

  }
};

