const TokenValidator = require('twilio-flex-token-validator').functionValidator

// should add TokenValidator
exports.handler = TokenValidator(async (context, event, callback) => {
  const helpers = loadServerlessModules(context, event)
  try {
    helpers.logger.debug(`tracking event ${JSON.stringify(event, null, 2)}`)
    const { SEGMENT_WRITE_KEY } = context

    let result = await helpers.segment.trackEvent(
      SEGMENT_WRITE_KEY,
      event.event,
      JSON.parse(event.properties),
      event.anonymousId,
      event.phone
    )

    const res = helpers.twilio.defaultResponse()
    res.setBody(result)
    helpers.logger.wait(() => {
      callback(null, res)
    })
  } catch (err) {
    helpers.logger.error('track action error: ', err)
    callback(err)
  }
})

/**
 * Twilio calls this method
 * @returns {Object} all helpers available
 */
const loadServerlessModules = (context, event) => {
  const functions = Runtime.getFunctions() //eslint-disable-line no-undef
  const serverlessHelperPath = functions['helpers/index'].path
  const serverlessHelper = require(serverlessHelperPath).Helpers
  return new serverlessHelper(context, event)
}
