import ApiError from "./ApiError.js";

export default function apiErrorHandler(err, req, res, next) {
  if (err instanceof ApiError) {
    res.status(err.code).json(err.message);
    return;
  }
  res.status(500).json();
}
