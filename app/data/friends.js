// -------------------------------------------
// Program: friends.js
// Purpose: program store the data and provides
//          funcitonality to manipulate it
// -------------------------------------------

// Modules
let questionArr = require('./questions');
let friendArr = require('./friendsData');

// Functions
function findFriendPosition(targetFriend) {
  let position = -1;
  // look for target friend by name
  for (let i = 0; i < friendArr.length; i++) {
    let friend = friendArr[i];
    if (friend.name === targetFriend.name) {
      position = i;
      break;
    }
  }
  return position;
}

function findFriendByName(name) {
  let targetFriend = undefined;
  // look for target friend by name
  for (let i = 0; i < friendArr.length; i++) {
    let friend = friendArr[i];
    if (friend.name === name) {
      targetFriend = friend;
      break;
    }
  }
  return targetFriend
}

function calculateDifference(friend, otherFriend) {
  let totalDiff = undefined;
  // Calculate total difference
  for (let i = 0; i < friend.scoresArr.length; i++) {
    // get firend and otherfreind quesiton answer
    let friendScore = friend.scoresArr[i].answer;
    let otherFriendScore = otherFriend.scoresArr[i].answer;
    // Compute difference, and store it
    if (totalDiff === undefined) {
      totalDiff = Math.abs(friendScore - otherFriendScore)
    } else {
      totalDiff += Math.abs(friendScore - otherFriendScore)
    }
  }
  return totalDiff;
}

function getClosestFriends(name) {
  // get the friend object for the target friend
  let targetFriend = findFriendByName(name);
  let closestFriend = undefined;
  // compare selected friend with all others
  for (let i = 0; i < friendArr.length; i++) {
    // grab friend in turn
    let otherFriend = friendArr[i];
    // do not compare with itslef
    if (targetFriend.name !== otherFriend.name) {
      // calculate the dfference
      let totalPoints = calculateDifference(targetFriend, otherFriend);
      // Store comparison
      if (closestFriend === undefined) {
        closestFriend = {
          friend: otherFriend,
          points: totalPoints
        };
      } else if (closestFriend.points > totalPoints) {
        closestFriend = {
          friend: otherFriend,
          points: totalPoints
        };
      }

    }
  }
  return closestFriend;
}

function addFriendToArray(friend) {
  // find friend position in array
  let pos = findFriendPosition(friend);
  // add or update into teh array
  if(pos > -1 ) {
    friendArr[pos] = friend;
  } else {  
    friendArr.push(friend);
  }
}

module.exports = {
  getQuestionsList() {
    return questionArr;
  },
  addFriend(friend) {
    addFriendToArray(friend);
  },
  getFriends() {
    return friendArr;
  },
  getCompatibleFriend(name) {
    cfriend = getClosestFriends(name);
    return cfriend
  }
}