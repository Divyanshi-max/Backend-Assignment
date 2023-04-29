let todos = [
    { id: 1, title: "Todo 1", completed: false },
    { id: 2, title: "Todo 2", completed: true },
    { id: 3, title: "Todo 3", completed: false }
  ];
  
  let users = [
    { id: 1, firstName: "John", lastName: "Doe", email: "john@example.com", password: "password", isActive: true, roles: ["user"] },
    { id: 2, firstName: "Jane", lastName: "Doe", email: "jane@example.com", password: "password", isActive: true, roles: ["admin"] }
  ];
  
  module.exports = {
    todos,
    users
  };
  