(function(window) {
  var firstOrMiddleWords,
    lastTitle = '',
    lastWords,
    newTitleButton = window.document.getElementById('get-title'),
    optionalFirstWords,
    shareURL = getShareURL(),
    titleElem = window.document.getElementById('title'),
    tweetButton = window.document.getElementById('tweet-title');

  // -=-=-=-=-=-=-=-=-=-=-=-=-= NAME GENERATION =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  // If three or more words, one of these words first:
  optionalFirstWords = [
    'Assistant',
    'Associate',
    'Senior',
    'Multimedia'
  ];

  // At least one of these words in every title, first or second (or both, can be used more than once in a row):
  firstOrMiddleWords = [
    'Audience',
    'Social',
    'Social Media',
    'Engagement',
    'Community',
    'Digital'
  ];

  // One of these words last:
  lastWords = [
    'Editor',
    'Producer',
    'Analyst',
    'Coordinator',
    'Director',
    'Manager',
    'Specialist',
    'Strategist',
    'Curator',
    'Writer',
    'Reporter',
    'Journalist'
  ];

  function randomWordFromList(list) {
    var listLength = list.length,
      randomWordIndex = Math.floor(Math.random() * listLength);
    return list[randomWordIndex];
  }

  function generateTitle() {
    var title = '';

    // Decide whether to make this be three words, and if so, pick a first
    // word.
    if (Math.random() > 0.5) {
      title += randomWordFromList(optionalFirstWords) + ' ';
    }

    // Pick a middle word.
    title += randomWordFromList(firstOrMiddleWords);

    // Pick a last word.
    title += ' ' + randomWordFromList(lastWords);

    return title;
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=- DOM MANIPULATION =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  function setTitle(title) {
    lastTitle = title;
    titleElem.innerHTML = title;
  }

  // -=-=-=-=-=-=-=-=-=-=-= SHARE URL CUSTOMIZATION =-=-=-=-=-=-=-=-=-=-=-=-=-=

  function getShareURL() {
    var match = /shareURL=([^&]+)/.exec(window.location.search);

    // Use the current URL if no other has been set.
    if (match == null) {
      return window.location.href;
    }

    return match[1];
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-= EVENT HANDLERS -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  function generateAndSetTitle(event) {
    var title = generateTitle();
    setTitle(title);
  }

  function tweetTitle(event) {
    window.open(
      (
        'http://twitter.com/share?text=' +
        encodeURIComponent(
          'My new social journalism title is ' + lastTitle + '!'
        ) +
        '&url=' + encodeURIComponent(shareURL)
      ),
      'sharer', 'toolbar=0,status=0,width=626,height=436'
    );
    return false;
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-= INITIALIZATION -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  newTitleButton.onclick = generateAndSetTitle;
  tweetButton.onclick = tweetTitle;
  generateAndSetTitle();
})(this);
