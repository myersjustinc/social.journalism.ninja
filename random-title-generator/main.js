(function(window) {
  var doneInitializing = false,
    lastTitle = '',
    lastWords,
    middleWords,
    newTitleButton = window.document.getElementById('get-title'),
    seniorityPrefixes,
    shareURL = getShareURL(),
    titleElem = window.document.getElementById('title'),
    tweetButton = window.document.getElementById('tweet-title');

  // -=-=-=-=-=-=-=-=-=-=-=-=-= NAME GENERATION =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  // If three or more words, one of these words first:
  seniorityPrefixes = [
    'Assistant',
    'Associate',
    'Senior',
    'Multimedia'
  ];

  // At least one of these words in every title, first or second (or both, can be used more than once in a row):
  middleWords = [
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
    var firstMiddle,
      secondMiddle,
      title = '';

    // Add a seniority prefix half the time.
    if (Math.random() < 0.6) {
      title += randomWordFromList(seniorityPrefixes) + ' ';
    }

    // Pick one or two middle words.
    firstMiddle = randomWordFromList(middleWords);
    title += firstMiddle;
    if (Math.random() < 0.75) {
      // Pick a second middle word some of the time, but make sure it isn't the
      // same as (or uncomfortably similar to) the first middle word.
      while(true) {  // WARNING: Infinite loop!
        secondMiddle = randomWordFromList(middleWords);
        if (
          (firstMiddle != secondMiddle) &&
          !(
            (firstMiddle == 'Social Media' && secondMiddle == 'Social') ||
            (firstMiddle == 'Social' && secondMiddle == 'Social Media')
          )
        ) {
          break;  // Escape the infinite loop!
        }
      }
      title += ' ' + secondMiddle;
    }

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

    if (doneInitializing) {
      window.ga && window.ga('send', {
        'hitType': 'event',
        'eventCategory': 'generate',
        'eventAction': 'generate',
        'eventLabel': title
      });
    }
  }

  function tweetTitle(event) {
    window.open(
      (
        'http://twitter.com/share?text=' +
        encodeURIComponent(lastTitle) +
        '&url=' + encodeURIComponent(shareURL)
      ),
      'sharer', 'toolbar=0,status=0,width=626,height=436'
    );

    window.ga && window.ga('send', {
      'hitType': 'event',
      'eventCategory': 'tweet',
      'eventAction': 'tweet',
      'eventLabel': lastTitle
    });
  }

  // -=-=-=-=-=-=-=-=-=-=-=-=-= INITIALIZATION -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=

  newTitleButton.onclick = generateAndSetTitle;
  tweetButton.onclick = tweetTitle;
  generateAndSetTitle();
  doneInitializing = true;
})(this);
