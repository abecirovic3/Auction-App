package com.atlantbh.auctionappbackend.utils;

public class EditDistanceCalculator {
    public static int calculateLevenshteinDistance(String str1, String str2) {
        int[] dist1 = new int[str1.length() + 1];
        int[] dist2 = new int[str1.length() + 1];
        int[] temp;

        for (int i = 0; i < dist1.length; i++) {
            dist1[i] = i;
        }

        for (int i = 0; i < str2.length(); i++) {
            dist2[0] = i + 1;

            for (int j = 0; j < str1.length(); j++) {
                int delCost = dist1[j+1] + 1;
                int insCost = dist2[j] + 1;
                int subCost = dist1[j];
                if (Character.toLowerCase(str1.charAt(j)) != Character.toLowerCase(str2.charAt(i))) {
                    subCost += 1;
                }
                dist2[j+1] = minCost(delCost, insCost, subCost);
            }

            temp = dist1;
            dist1 = dist2;
            dist2 = temp;
        }

        return dist1[str1.length()];
    }

    private static int minCost(int delCost, int insCost, int subCost) {
        if (delCost < insCost && delCost < subCost) {
            return delCost;
        }

        return Math.min(insCost, subCost);
    }
}
