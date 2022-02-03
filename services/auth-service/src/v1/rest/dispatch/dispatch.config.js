module.exports = (data) => {
    return {
      source: "create-user",
      id: data.id,
      _id: data._id,
      username: data.username,
      createdAt: data.createdAt
    }
  }
  