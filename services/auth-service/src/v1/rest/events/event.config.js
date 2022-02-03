module.exports = (object) => {
  console.log(object);
    return {
      source: "create-user",
      data: object.data,
      createdAt: object.createdAt
    }
  }
  