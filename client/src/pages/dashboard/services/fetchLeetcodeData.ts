import axios from "axios";
import { LeetcodeData } from "../components/LeetcodeInfo";

export const fetchLeetcodeData = async (username: string): Promise<LeetcodeData> => {
  console.log('ye function call ho rha hai', username);
  const baseUrl = `https://alfa-leetcode-api.onrender.com/${username}`;

  // Fetching the solved and badges data
  const [solvedResponse, badgesResponse] = await Promise.all([
    axios.get(`${baseUrl}/solved`),
    axios.get(`${baseUrl}/badges`),
  ]);

  // Destructuring only the necessary data
  const { solvedProblem, easySolved, mediumSolved, hardSolved } =
    solvedResponse.data;
  const { badgesCount, badges } = badgesResponse.data;

  // Returning the required data
  return {
    solved: {
      solvedProblem,
      easySolved,
      mediumSolved,
      hardSolved,
    },
    badges: {
      badgesCount,
      badges: badges.slice(0, 3),
    },
  };
};