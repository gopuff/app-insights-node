let appInsights = require('applicationinsights');
const fs = require('fs');
const moment = require('moment');
require('dotenv').config();

appInsights
  .setup(process.env.APP_INSIGHTS_KEY)
  .setAutoDependencyCorrelation(false)
  .setInternalLogging(true, true)
  .setAutoCollectRequests(false)
  .setAutoCollectPerformance(false, false)
  .setAutoCollectExceptions(false)
  .setAutoCollectDependencies(false)
  .setAutoCollectConsole(false)
  .setUseDiskRetryCaching(false)
  .setSendLiveMetrics(false)
  .start();

const client = appInsights.defaultClient;

const file = `${process.env.APPCENTER_OUTPUT_DIRECTORY}/${process.env.APP_FILE}`;
const fileStats = fs.statSync(file);
const platform = process.env.APPCENTER_ANDROID_VARIANT ? 'android' : 'ios';
const duration = moment().diff(moment.unix(parseInt(process.env.APPCENTER_BUILD_ID)), 'seconds');
client.trackEvent({
  name: 'build',
  properties: {
    duration,
    size: fileStats.size,
    platform,
    buildNumber: process.env.APPCENTER_BUILD_ID,
    branch: process.env.APPCENTER_BRANCH,
    status: process.env.AGENT_JOBSTATUS,
  },
});

client.trackMetric({ name: `${platform}BuildTime`, value: duration });
client.trackMetric({ name: `${platform}BuildStatus`, value: process.env.AGENT_JOBSTATUS });
client.trackMetric({ name: `${platform}BuildSize`, value: fileStats.size });
