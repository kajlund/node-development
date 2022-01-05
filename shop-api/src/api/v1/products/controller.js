const Product = require('./model')

exports.getAllProductsStatic = async (req, res, next) => {
  const products = await Product.find({ featured: true })
  res.status(200).json({ nbHits: products.length, products })
}

exports.getAllProducts = async (req, res, next) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query
  const qryObj = {}

  if (featured) {
    qryObj.featured = featured === 'true'
  }

  if (company) {
    qryObj.company = company
  }

  if (name) {
    qryObj.name = { $regex: name, $options: 'i' }
  }

  if (numericFilters) {
    const opsMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    }

    const regex = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(regex, (match) => `-${opsMap[match]}-`)
    const options = ['price', 'rating']
    filters.split(',').forEach((item) => {
      const [field, op, val] = item.split('-')
      if (options.includes(field)) {
        qryObj[field] = { [op]: Number(val) }
      }
    })
  }

  let result = Product.find(qryObj)
  let sortStr = 'createdAt'

  if (sort) {
    sortStr = sort.split(',').join(' ')
  }
  result.sort(sortStr)

  if (fields) {
    result.select(fields.split(',').join(' '))
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result
  res.status(200).json({ nbHits: products.length, products })
}
