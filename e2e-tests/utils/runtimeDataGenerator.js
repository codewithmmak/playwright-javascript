function timestamp() {
  return Date.now();
}

function randomSuffix(length = 6) {
  return Math.random().toString(36).slice(2, 2 + length);
}

function generateUniqueEmail(domain = "example.test", prefix = "autouser") {
  return `${prefix}.${timestamp()}.${randomSuffix()}@${domain}`;
}

function generateOrderRef(prefix = "ORD") {
  return `${prefix}-${timestamp()}-${randomSuffix(5).toUpperCase()}`;
}

module.exports = {
  generateUniqueEmail,
  generateOrderRef,
};
