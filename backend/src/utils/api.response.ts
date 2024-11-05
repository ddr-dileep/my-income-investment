const apiResponse = {
  SUCCESS: (data: any) => {
    return {
      success: true,
      data,
      message: data?.message || "Success",
    };
  },

  ERROR: (error: any) => {
    let statusCode = 500;
    let errorMessage = "Something went wrong";
    let details = null;

    // Check for Mongoose validation error
    if (error.name === "ValidationError") {
      statusCode = 400;
      errorMessage = "Validation failed";
      details = Object.keys(error.errors).map((field) => ({
        field,
        message: error.errors[field].message,
        kind: error.errors[field].kind,
      }));
    }

    // Check for MongoDB duplicate key error
    if (error.code === 11000) {
      statusCode = 409;
      const field = Object.keys(error.keyValue)[0];
      errorMessage = `Duplicate entry for ${field}: '${error.keyValue[field]}'`;
      details = { field, value: error.keyValue[field] };
    }

    return {
      success: false,
      statusCode,
      error: { message: errorMessage, details },
    };
  },
};

export default apiResponse;
