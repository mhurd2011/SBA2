// //// The provided course information.
// const CourseInfo = {
//   id: 451,
//   name: "Introduction to JavaScript"
// };

// // The provided assignment group.
// const AssignmentGroup = {
//   id: 12345,
//   name: "Fundamentals of JavaScript",
//   course_id: 451,
//   group_weight: 25,
//   assignments: [
//     {
//       id: 1,
//       name: "Declare a Variable",
//       due_at: "2023-01-25",
//       points_possible: 50
//     },
//     {
//       id: 2,
//       name: "Write a Function",
//       due_at: "2023-02-27",
//       points_possible: 150
//     },
//     {
//       id: 3,
//       name: "Code the World",
//       due_at: "3156-11-15",
//       points_possible: 500
//     }
//   ]
// };

// // The provided learner submission data.
// const LearnerSubmissions = [
//   {
//     learner_id: 125,
//     assignment_id: 1,
//     submission: {
//       submitted_at: "2023-01-25",
//       score: 47
//     }
//   },
//   {
//     learner_id: 125,
//     assignment_id: 2,
//     submission: {
//       submitted_at: "2023-02-12",
//       score: 150
//     }
//   },
//   {
//     learner_id: 125,
//     assignment_id: 3,
//     submission: {
//       submitted_at: "2023-01-25",
//       score: 400
//     }
//   },
//   {
//     learner_id: 132,
//     assignment_id: 1,
//     submission: {
//       submitted_at: "2023-01-24",
//       score: 39
//     }
//   },
//   {
//     learner_id: 132,
//     assignment_id: 2,
//     submission: {
//       submitted_at: "2023-03-07",
//       score: 140
//     }
//   }
// ];

// function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
//   // Defining a function to calculate the score for a learner
//   const calculateScoreForLearner = (learnerId) => {
//     let totalScore = 0;
//     let totalPossibleScore = 0;
//     const learnerScores = {};

//     for (const assignment of AssignmentGroup.assignments) {
//       const submission = LearnerSubmissions.find(
//         (submission) =>
//           submission.learner_id === learnerId &&
//           submission.assignment_id === assignment.id
//       );

//       switch (true) {
//         case submission === undefined:
//           totalPossibleScore += assignment.points_possible;
//           continue;
//         default:
//           totalScore += submission.submission.score;
//           totalPossibleScore += assignment.points_possible;
//           learnerScores[assignment.id] = (submission.submission.score / assignment.points_possible).toFixed(2);
//       }
//     }

//     const avgScore = (totalScore / totalPossibleScore).toFixed(2);
//     return { id: learnerId, avg: avgScore, ...learnerScores };
//   };

//   // Extracting unique learner IDs
//   const learnerIds = [
//     ...new Set(LearnerSubmissions.map((submission) => submission.learner_id)),
//   ];

//   // Calculating scores for each learner
//   let learnerScores = [];
//   try {
//     learnerScores = learnerIds.map((learnerId) =>
//       calculateScoreForLearner(learnerId)
//     );
//   } catch (error) {
//     console.error('Error calculating learner scores:', error);
//   }

//   return learnerScores;
// }



// const learnerData = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
// console.log(learnerData);






//////////// Clean-up //////////////////



// Course info
const CourseInfo = { id: 451, name: "Introduction to JavaScript" };

// Assignment groups
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: CourseInfo.id,
  group_weight: 25,
  assignments: [
    { id: 1, name: "Declare a Variable", due_at: "2023-01-25", points_possible: 50 },
    { id: 2, name: "Write a Function", due_at: "2023-02-27", points_possible: 150 },
    { id: 3, name: "Code the World", due_at: "3156-11-15", points_possible: 500 }
  ]
};

// Learner subs
const LearnerSubmissions = [
  { learner_id: 125, assignment_id: 1, submission: { submitted_at: "2023-01-25", score: 47 } },
  { learner_id: 125, assignment_id: 2, submission: { submitted_at: "2023-02-12", score: 150 } },
  { learner_id: 125, assignment_id: 3, submission: { submitted_at: "2023-01-25", score: 400 } },
  { learner_id: 132, assignment_id: 1, submission: { submitted_at: "2023-01-24", score: 39 } },
  { learner_id: 132, assignment_id: 2, submission: { submitted_at: "2023-03-07", score: 140 } }
];

// Function to calculate scores
function calculateLearnerScore(learnerId) {
  // Filter submissions for the current learner
  const learnerSubmissions = LearnerSubmissions.filter(sub => sub.learner_id === learnerId);
  const scores = {};

  let totalScore = 0, totalPossibleScore = 0;

  // Loop through assignments
  for (const assignment of AssignmentGroup.assignments) {
    // Find subs for the current assignment
    const submission = learnerSubmissions.find(sub => sub.assignment_id === assignment.id);

    // If sub exists
    if (submission) {
      const score = submission.submission.score;
      totalScore += score;
      totalPossibleScore += assignment.points_possible;
      scores[assignment.id] = (score / assignment.points_possible).toFixed(2);
    } else {
      // If submission doesn't exist, 
      totalPossibleScore += assignment.points_possible;
    }
  }

  // Calculate average score
  const avgScore = (totalScore / totalPossibleScore).toFixed(2);
  return { id: learnerId, avg: avgScore, ...scores };
}

// Get unique learner IDs
const learnerIds = [...new Set(LearnerSubmissions.map(sub => sub.learner_id))];

// Calculate scores for each learner
const learnerScores = learnerIds.map(learnerId => calculateLearnerScore(learnerId));

console.log(learnerScores);