export enum RabbitMQ {
  UserQueue = 'users',
  ProjectQueue = 'projects',
  CashFlowQueue = 'cash-flows',
  NotificationQueue = 'notifications',
  ReminderQueue = 'reminders',
  ChatQueue = 'chats',
  HomeQueue = 'homes',
  CategoryQueue = 'categories',
  InvestmentQueue = 'investments'
}

export enum UserMSG {
  CREATE = 'CREATE_USER',
  FIND_ALL = 'FIND_USERS',
  FIND_ONE = 'FIND_USER',
  UPDATE = 'UPDATE_USER',
  DELETE = 'DELETE_USER',
  VALID_USER = 'VALID_USER',
  VALID_PASS = 'VALID_PASS',
  UPDATE_CURRENT = 'UPDATE_CURRENT_USER'
}

export enum ProjectMSG {
  CREATE = 'CREATE_PROJECT',
  FIND_ALL = 'FIND_PROJECTS',
  FIND_ONE = 'FIND_PROJECT',
  UPDATE = 'UPDATE_PROJECT',
  DELETE = 'DELETE_PROJECT',
  ADD_MEMBER = 'ADD_MEMBER_PROJECT'
}

export enum CashFlowMSG {
  CREATE = 'CREATE_CASH-FLOW',
  FIND_ALL = 'FIND_CASH-FLOW',
  FIND_ONE = 'FIND_CASH-FLOW',
  UPDATE = 'UPDATE_CASH-FLOW',
  DELETE = 'DELETE_CASH-FLOW',
}

export enum ChatMSG {
  CREATE = 'CREATE_CHAT',
  FIND_ALL = 'FIND_CHAT',
  FIND_ONE = 'FIND_CHAT',
  UPDATE = 'UPDATE_CHAT',
  DELETE = 'DELETE_CHAT',
}

export enum HomeMSG {
  CREATE = 'CREATE_HOME',
  FIND_ALL = 'FIND_HOME',
  FIND_ONE = 'FIND_HOME',
  UPDATE = 'UPDATE_HOME',
  DELETE = 'DELETE_HOME',
}

export enum CategoryMSG {
  CREATE = 'CREATE_CATEGORY',
  FIND_ALL = 'FIND_CATEGORY',
  FIND_ONE = 'FIND_CATEGORY',
  UPDATE = 'UPDATE_CATEGORY',
  DELETE = 'DELETE_CATEGORY',
}

export enum ReminderMSG {
  CREATE = 'CREATE_REMINDER',
  FIND_ALL = 'FIND_REMINDER',
  FIND_ONE = 'FIND_REMINDER',
  UPDATE = 'UPDATE_REMINDER',
  DELETE = 'DELETE_REMINDER',
}

export enum NotificationMSG {
  CREATE = 'CREATE_NOTIFICATION',
  FIND_ALL = 'FIND_NOTIFICATION',
  FIND_ONE = 'FIND_NOTIFICATION',
  UPDATE = 'UPDATE_NOTIFICATION',
  DELETE = 'DELETE_NOTIFICATION',
}

export enum InvestmentMSG {
  CREATE = 'CREATE_INVESTMENT',
  FIND_ALL = 'FIND_INVESTMENT',
  FIND_ONE = 'FIND_INVESTMENT',
  UPDATE = 'UPDATE_INVESTMENT',
  DELETE = 'DELETE_INVESTMENT',
}