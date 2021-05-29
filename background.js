QUESTION_PAGE_REGEX = /https:\/\/stackoverflow.com\/questions\/[0-9]*\//;

MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
];

const displayCount = () => {
  const today = new Date(Date());
  const dateOfMonth = today.getDate();
  const month = MONTHS[today.getMonth()];
  const year = today.getFullYear();
  startTime = new Date(`${dateOfMonth} ${month} ${year}`).getTime();
  endTime = new Date(`${dateOfMonth + 1} ${month} ${year}`).getTime();

  chrome.history.search(
    {
      text: 'https://stackoverflow.com/questions/',
      maxResults: 250,
      startTime,
      endTime
    },
    results => {
      results = results.filter(({ url }) => url.match(QUESTION_PAGE_REGEX));
      chrome.action.setBadgeText({ text: results.length.toString() });
    }
  );
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => displayCount());
chrome.tabs.onCreated.addListener(tab => displayCount());
chrome.runtime.onInstalled.addListener(() => displayCount());
