
const bcrypt=require('bcrypt');

module.exports = {

  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [{
      email: 'hospital123@gmail.com',
      password:bcrypt.hashSync('hospital123',10) ,
      createdAt: new Date(),
      updatedAt: new Date()
    }]);
  },
  
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users',null, {});
  }
};
