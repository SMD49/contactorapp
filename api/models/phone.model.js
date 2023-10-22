module.exports = (sequelize, Sequelize) => {
    const Phone = sequelize.define("phone", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    
        // DEFINE YOUR MODEL HERE
        Number: {
            type:Sequelize.STRING
        },
        type: {
            type:Sequelize.STRING
        },
    });
  
    return Phone;
};