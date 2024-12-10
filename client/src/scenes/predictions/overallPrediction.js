// predictionUtils.js

export const getOverallPrediction = (
  technicalAnalysisResult,
  descriptions,
  setOverallPrediction
) => {
  // Define weights for technical and sentiment analysis
  const techWeight = 0.5; // 50% weight for technical analysis
  const sentimentWeight = 0.5; // 50% weight for sentiment analysis

  // Define percentages based on technical analysis result
  let techBuy = 0;
  let techSell = 0;
  let techHold = 0;

  if (technicalAnalysisResult.includes("Buy")) {
    techBuy = 80; // Strong buy signal from technical analysis
    techHold = 20; // Some hold signal
  } else if (technicalAnalysisResult.includes("Sell")) {
    techSell = 80; // Strong sell signal from technical analysis
    techHold = 20; // Some hold signal
  } else {
    techHold = 100; // Hold signal from technical analysis
  }

  // Define percentages based on sentiment analysis result
  let sentimentBuy = 0;
  let sentimentSell = 0;
  let sentimentHold = 0;

  if (descriptions.includes("Positive")) {
    sentimentBuy = 70; // Positive sentiment, strong buy signal
    sentimentHold = 30; // Some hold signal
  } else if (descriptions.includes("Negative")) {
    sentimentSell = 80; // Negative sentiment, strong sell signal
    sentimentHold = 20; // Some hold signal
  } else {
    sentimentHold = 100; // Neutral sentiment, hold signal
  }

  // Combine the percentages using weights
  const finalBuyPercentage =
    (techBuy * techWeight + sentimentBuy * sentimentWeight) /
    (techWeight + sentimentWeight);

  const finalSellPercentage =
    (techSell * techWeight + sentimentSell * sentimentWeight) /
    (techWeight + sentimentWeight);

  const finalHoldPercentage =
    (techHold * techWeight + sentimentHold * sentimentWeight) /
    (techWeight + sentimentWeight);

  console.log("Final Buy Percentage:", finalBuyPercentage);
  console.log("Final Sell Percentage:", finalSellPercentage);
  console.log("Final Hold Percentage:", finalHoldPercentage);

  // Declare and initialize result string
  let result = `Final Buy Percentage: ${finalBuyPercentage}%\n` +
               `Final Sell Percentage: ${finalSellPercentage}%\n` +
               `Final Hold Percentage: ${finalHoldPercentage}%\n`;

  // Determine overall prediction based on combined percentages
  let finalPrediction = ""; // Variable to store the final prediction

  if (
    finalBuyPercentage > finalSellPercentage &&
    finalBuyPercentage > finalHoldPercentage
  ) {
    if (finalBuyPercentage > 75) {
      finalPrediction = "Quick Buy";
    } else {
      finalPrediction = "Wait and Buy";
    }
  } else if (
    finalSellPercentage > finalBuyPercentage &&
    finalSellPercentage > finalHoldPercentage
  ) {
    if (finalSellPercentage > 75) {
      finalPrediction = "Quick Sell";
    } else {
      finalPrediction = "Wait and Sell";
    }
  } else {
    finalPrediction = "Hold";
  }

  // Append the final overall analysis result to the result string
  result += `\nFinal Overall Analysis Result: ${finalPrediction}`;

  // Set the overall prediction with the detailed result
  setOverallPrediction(result);
};
