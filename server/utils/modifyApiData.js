// import data from "../fetchedData.json" assert { type: "json" };
// import { promises as fs } from 'fs';
// import path from 'path';

// const readJSON = async (filePath) => {
//   try {
//     const data = await fs.readFile(filePath, 'utf8');
//     return JSON.parse(data);
//   } catch (error) {
//     console.error('Error reading JSON file:', error);
//     throw error;
//   }
// };
// let jsonData;
// const init = async () => {
//   const filePath = path.resolve(__dirname, '../fetchedData.json');
//   jsonData = await readJSON(filePath);

// };

// init();
// console.log(jsonData);

// function aggregateSalesDataByStaff(data) {
//   const aggregatedData = {};

//   // Get all product types
//   const allProductTypes = getAllProductTypes(data);

//   data.forEach((store) => {
//     const storeName = store.StoreName;
//     if (!aggregatedData[storeName]) {
//       aggregatedData[storeName] = {};
//     }

//     store.SalesDataaggregation.forEach((sale) => {
//       const key = sale.SalesStaffName;
//       if (!aggregatedData[storeName][key]) {
//         aggregatedData[storeName][key] = {
//           SalesStaffName: sale.SalesStaffName,
//           SaleValue: 0,
//           SaleCount: 0,
//           salesRecord: {},
//         };
//         // Initialize salesRecord with all product types and count as 0
//         allProductTypes.forEach((productType) => {
//           aggregatedData[storeName][key].salesRecord[productType] = 0;
//         });
//       }
//       aggregatedData[storeName][key].SaleCount += sale.SaleCount;
//       aggregatedData[storeName][key].salesRecord[sale.ProductType] +=
//         sale.SaleCount;
//     });
//   });

//   return aggregatedData;
// }

// function getAllProductTypes(data) {
//   const productTypes = new Set();

//   data.forEach((store) => {
//     store.SalesDataaggregation.forEach((sale) => {
//       productTypes.add(sale.ProductType);
//     });
//   });

//   return Array.from(productTypes);
// }
// function getAllStoreNames(data) {
//   return data.map((store) => store.StoreName);
// }

export const jsonData = [
  {
    StoreName: "Torquay",
    SalesDataaggregation: [
      {
        SalesStaffName: "Katie Moller",
        SaleValue: 0.0,
        SaleCount: 1,
        ProductType: "Belong NBN",
      },
      {
        SalesStaffName: "Lateesha Snow",
        SaleValue: 0.0,
        SaleCount: 4,
        ProductType: "Belong NBN",
      },
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 295.35,
        SaleCount: 1,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Katie Moller",
        SaleValue: 295.35,
        SaleCount: 1,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 6837.5,
        SaleCount: 3,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Carson Lewis",
        SaleValue: 6489.0,
        SaleCount: 4,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Katie Moller",
        SaleValue: 3984.0,
        SaleCount: 2,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Lateesha Snow",
        SaleValue: 8771.5,
        SaleCount: 5,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Sam Dunmore",
        SaleValue: 4445.5,
        SaleCount: 2,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 10242.86,
        SaleCount: 21,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Carson Lewis",
        SaleValue: 7831.98,
        SaleCount: 14,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Katie Moller",
        SaleValue: 6237.33,
        SaleCount: 23,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Lateesha Snow",
        SaleValue: 17232.66,
        SaleCount: 37,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Sam Dunmore",
        SaleValue: 10768.79,
        SaleCount: 18,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 142.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Carson Lewis",
        SaleValue: 176.0,
        SaleCount: 1,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Carson Lewis",
        SaleValue: 133.98,
        SaleCount: 1,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Katie Moller",
        SaleValue: 133.98,
        SaleCount: 1,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Lateesha Snow",
        SaleValue: 207.9,
        SaleCount: 1,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 22.0,
        SaleCount: 1,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Katie Moller",
        SaleValue: 22.0,
        SaleCount: 1,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Lateesha Snow",
        SaleValue: 44.0,
        SaleCount: 2,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Sam Dunmore",
        SaleValue: 44.0,
        SaleCount: 2,
        ProductType: "Upgrade & Protect",
      },
    ],
  },
  {
    StoreName: "Traralgon",
    SalesDataaggregation: [
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 0.0,
        SaleCount: 1,
        ProductType: "Belong NBN",
      },
      {
        SalesStaffName: "Abby Taylor",
        SaleValue: 330.0,
        SaleCount: 1,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 295.35,
        SaleCount: 1,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 920.7,
        SaleCount: 3,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Sullivan Stray",
        SaleValue: 706.2,
        SaleCount: 2,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Abby Taylor",
        SaleValue: 12764.0,
        SaleCount: 7,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Andy Adams",
        SaleValue: 6668.0,
        SaleCount: 4,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 8218.0,
        SaleCount: 4,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Lisa Mackrell",
        SaleValue: 12195.0,
        SaleCount: 7,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Sullivan Stray",
        SaleValue: 13298.0,
        SaleCount: 8,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Abby Taylor",
        SaleValue: 15748.5,
        SaleCount: 33,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Andy Adams",
        SaleValue: 11994.21,
        SaleCount: 35,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Bec Ellul",
        SaleValue: 50.0,
        SaleCount: 2,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 391.55,
        SaleCount: 5,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 14106.17,
        SaleCount: 40,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Lisa Mackrell",
        SaleValue: 13024.95,
        SaleCount: 35,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Sullivan Stray",
        SaleValue: 21647.05,
        SaleCount: 39,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Abby Collinson",
        SaleValue: 9025.0,
        SaleCount: 132,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Adam Glover",
        SaleValue: 753.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Amanda Bermingham",
        SaleValue: 23930.0,
        SaleCount: 212,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 62207.5,
        SaleCount: 729,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Anita Richardson",
        SaleValue: 249.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ashlee Elrick",
        SaleValue: 10408.0,
        SaleCount: 90,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ashleigh Albanese",
        SaleValue: 980.0,
        SaleCount: 10,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Barry Doyle",
        SaleValue: 7329.0,
        SaleCount: 97,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bec Ellul",
        SaleValue: 9560.0,
        SaleCount: 82,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bianca Spiteri",
        SaleValue: 1471.0,
        SaleCount: 9,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brad Gerke",
        SaleValue: 656.0,
        SaleCount: 4,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bree Gauci",
        SaleValue: 1850.0,
        SaleCount: 20,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brendan Over",
        SaleValue: 11182.0,
        SaleCount: 86,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bridgette OLeary",
        SaleValue: 199.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brittany Mackrell",
        SaleValue: 3710.0,
        SaleCount: 20,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brittany Miller",
        SaleValue: 1469.0,
        SaleCount: 16,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Caitlin Phillippi",
        SaleValue: 150.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Cameron Coster",
        SaleValue: 1023.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Cameron Pistrin",
        SaleValue: 8171.0,
        SaleCount: 49,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Cara Hegarty",
        SaleValue: 9375.0,
        SaleCount: 91,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Chania Burley",
        SaleValue: 178.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Chris Golding",
        SaleValue: 0.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Cienna Byers",
        SaleValue: 387.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Courtney Elston",
        SaleValue: 148.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Dale Fleming",
        SaleValue: 40472.0,
        SaleCount: 401,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Dannielle Patterson",
        SaleValue: 3368.99,
        SaleCount: 64,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Danny Phillips",
        SaleValue: 99.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Darcy Collins",
        SaleValue: 17356.0,
        SaleCount: 108,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Dayne Wynn",
        SaleValue: 1413.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Denise Chalmers",
        SaleValue: 2603.0,
        SaleCount: 24,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Edward Grant",
        SaleValue: 158.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Emily Gribble",
        SaleValue: 3688.0,
        SaleCount: 30,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Emma Russell",
        SaleValue: 6318.0,
        SaleCount: 69,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Erin Rabl",
        SaleValue: 208.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 131914.0,
        SaleCount: 680,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Hayley Richardson",
        SaleValue: 278.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Iain Edgar",
        SaleValue: 16504.0,
        SaleCount: 230,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Isis Ibbetson",
        SaleValue: 1134.0,
        SaleCount: 6,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jacob Hector",
        SaleValue: 1494.0,
        SaleCount: 13,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jake Bickerdike",
        SaleValue: 130.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jason Kemp",
        SaleValue: 119.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jemma Rutter",
        SaleValue: 955.0,
        SaleCount: 5,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jerica Tang",
        SaleValue: 22923.0,
        SaleCount: 342,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jess Whitelaw",
        SaleValue: 2199.0,
        SaleCount: 11,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jordan Flores",
        SaleValue: 249.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Josh Dunn",
        SaleValue: 2464.0,
        SaleCount: 26,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Justin Massaro",
        SaleValue: 13093.0,
        SaleCount: 123,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jye Jarvis",
        SaleValue: 89.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Karen Rebusquillo",
        SaleValue: 199.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Kathleen Goodwin",
        SaleValue: 457.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Katie Morris",
        SaleValue: 1167.0,
        SaleCount: 12,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Kaycee Wilson",
        SaleValue: 4962.0,
        SaleCount: 52,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Kaylee Griffiths",
        SaleValue: 1785.0,
        SaleCount: 15,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Keryn Mayer",
        SaleValue: 3181.0,
        SaleCount: 31,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Krystal Carrick",
        SaleValue: 846.0,
        SaleCount: 8,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Kylie Potts",
        SaleValue: 2315.0,
        SaleCount: 15,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Lachie Dalton",
        SaleValue: 249.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Lara Radford",
        SaleValue: 3790.0,
        SaleCount: 22,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Lisa Mackrell",
        SaleValue: 13950.0,
        SaleCount: 95,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Lucinda Martin",
        SaleValue: 794.0,
        SaleCount: 6,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Manon Albert",
        SaleValue: 18360.0,
        SaleCount: 224,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Marvin Vicente",
        SaleValue: 18619.0,
        SaleCount: 156,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Matt Landmeter",
        SaleValue: 1280.0,
        SaleCount: 45,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Matthew Allwood",
        SaleValue: 773.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Mel Polglaze",
        SaleValue: 288.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Melissa Polglaze",
        SaleValue: 1421.0,
        SaleCount: 9,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Melissa Pudney",
        SaleValue: 5734.0,
        SaleCount: 48,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Natalie Toull",
        SaleValue: 119.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Natalie Wenham",
        SaleValue: 29481.0,
        SaleCount: 247,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Natasha Hearn",
        SaleValue: 2262.0,
        SaleCount: 18,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nathan Evans",
        SaleValue: 513.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nathan Parsons",
        SaleValue: 35283.0,
        SaleCount: 287,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nathan Tourtoulas",
        SaleValue: 38746.0,
        SaleCount: 228,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nick Mackrell",
        SaleValue: 63375.0,
        SaleCount: 312,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nick Watson",
        SaleValue: 59.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Paul Brown",
        SaleValue: 2.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Peta Seymour",
        SaleValue: 105465.0,
        SaleCount: 695,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Peta Turvey",
        SaleValue: 38510.0,
        SaleCount: 335,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ross Slater",
        SaleValue: 35952.0,
        SaleCount: 417,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Scott Fussell",
        SaleValue: 69.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Shae Haefele",
        SaleValue: 42516.0,
        SaleCount: 267,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Sharni NIckels",
        SaleValue: 566.0,
        SaleCount: 4,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Shelby Lawrence",
        SaleValue: 23821.0,
        SaleCount: 283,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Simone Sessions",
        SaleValue: 129.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Steve Walker",
        SaleValue: 99.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Sullivan Stray",
        SaleValue: 328.0,
        SaleCount: 4,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Susie Asmussen",
        SaleValue: 41557.0,
        SaleCount: 199,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Susie Bridges",
        SaleValue: 6753.0,
        SaleCount: 62,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Tarley Frost",
        SaleValue: 497.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Taylah Edwards",
        SaleValue: 4070.0,
        SaleCount: 44,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Taylah Thornton",
        SaleValue: 1789.0,
        SaleCount: 17,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Taylah Trew",
        SaleValue: 109.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Teagan Elms",
        SaleValue: 34596.0,
        SaleCount: 267,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Tione Prior",
        SaleValue: 18290.0,
        SaleCount: 70,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Victoria Smith",
        SaleValue: 14297.0,
        SaleCount: 125,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Abby Taylor",
        SaleValue: 176.0,
        SaleCount: 1,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 203.72,
        SaleCount: 1,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Lisa Mackrell",
        SaleValue: 352.0,
        SaleCount: 2,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Abby Taylor",
        SaleValue: 115.5,
        SaleCount: 2,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 46.2,
        SaleCount: 2,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 57.75,
        SaleCount: 1,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Lisa Mackrell",
        SaleValue: 433.95,
        SaleCount: 4,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Sullivan Stray",
        SaleValue: 80.85,
        SaleCount: 2,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Abby Taylor",
        SaleValue: 66.0,
        SaleCount: 3,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Andy Adams",
        SaleValue: 44.0,
        SaleCount: 2,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Frank Miriello",
        SaleValue: 88.0,
        SaleCount: 4,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Sullivan Stray",
        SaleValue: 110.0,
        SaleCount: 5,
        ProductType: "Upgrade & Protect",
      },
    ],
  },
  {
    StoreName: "Warragul",
    SalesDataaggregation: [
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 0.0,
        SaleCount: 2,
        ProductType: "Belong NBN",
      },
      {
        SalesStaffName: "Shae Haefele",
        SaleValue: 0.0,
        SaleCount: 1,
        ProductType: "Belong NBN",
      },
      {
        SalesStaffName: "Bec Ellul",
        SaleValue: 196.35,
        SaleCount: 1,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 196.35,
        SaleCount: 1,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 722.7,
        SaleCount: 3,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Tayla Lochki",
        SaleValue: 295.35,
        SaleCount: 1,
        ProductType: "Bundle New (2)",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 2153.5,
        SaleCount: 1,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Jim Abbas",
        SaleValue: 13024.5,
        SaleCount: 7,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 17835.0,
        SaleCount: 10,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Purnima Manori",
        SaleValue: 15898.0,
        SaleCount: 9,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Tayla Lochki",
        SaleValue: 39858.5,
        SaleCount: 20,
        ProductType: "DPC Mobile / Tablet",
      },
      {
        SalesStaffName: "Bec Ellul",
        SaleValue: 544.35,
        SaleCount: 9,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 5073.1,
        SaleCount: 13,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Jen Bautista",
        SaleValue: 2083.58,
        SaleCount: 12,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Jim Abbas",
        SaleValue: 13674.0,
        SaleCount: 21,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 28724.36,
        SaleCount: 51,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Purnima Manori",
        SaleValue: 20554.44,
        SaleCount: 31,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Shae Haefele",
        SaleValue: 646.5,
        SaleCount: 5,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Tayla Lochki",
        SaleValue: 47588.32,
        SaleCount: 68,
        ProductType: "Handset/Plan GP",
      },
      {
        SalesStaffName: "Abby Collinson",
        SaleValue: 915.0,
        SaleCount: 12,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 15371.0,
        SaleCount: 122,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ashlee Elrick",
        SaleValue: 1339.0,
        SaleCount: 11,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ashlee Sincock",
        SaleValue: 3889.0,
        SaleCount: 33,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Barry Doyle",
        SaleValue: 49.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bastian Smythe",
        SaleValue: 179.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bec Ellul",
        SaleValue: 1423.0,
        SaleCount: 17,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ben Holmes",
        SaleValue: 586.0,
        SaleCount: 4,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bernice Yu",
        SaleValue: 1500.0,
        SaleCount: 11,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bianca Spiteri",
        SaleValue: 27506.0,
        SaleCount: 251,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brendan Over",
        SaleValue: 298.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brett Paynter",
        SaleValue: 10462.0,
        SaleCount: 80,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brittany Miller",
        SaleValue: 178.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Caitlin Phillippi",
        SaleValue: 15021.0,
        SaleCount: 183,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Charlie Rogers",
        SaleValue: 703.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 69.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Chris Bermingham",
        SaleValue: 4611.0,
        SaleCount: 60,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Chris Golding",
        SaleValue: 10571.0,
        SaleCount: 135,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Claire de Little",
        SaleValue: 9285.0,
        SaleCount: 85,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Dale Fleming",
        SaleValue: 377.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Danny Ghori",
        SaleValue: 102134.0,
        SaleCount: 536,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Darcy Collins",
        SaleValue: 965.0,
        SaleCount: 5,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ella Gardner",
        SaleValue: 1647.0,
        SaleCount: 13,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Emma Russell",
        SaleValue: 1564.0,
        SaleCount: 22,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Erin Fox",
        SaleValue: 198.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Erin Rabl",
        SaleValue: 20172.0,
        SaleCount: 198,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Gia Tambis",
        SaleValue: 4561.0,
        SaleCount: 21,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Grant Mckenzie",
        SaleValue: 198.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Hailey McEwan",
        SaleValue: 2334.0,
        SaleCount: 20,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Hayley Nugent",
        SaleValue: 5808.0,
        SaleCount: 86,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Hayley Richardson",
        SaleValue: 12604.0,
        SaleCount: 98,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Iain Edgar",
        SaleValue: 455.0,
        SaleCount: 5,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Isis Ibbetson",
        SaleValue: 116131.5,
        SaleCount: 916,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jade Jamieson",
        SaleValue: 1184.0,
        SaleCount: 6,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jake Bickerdike",
        SaleValue: 31933.0,
        SaleCount: 280,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jayden Leggett",
        SaleValue: 41449.0,
        SaleCount: 189,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jen Bautista",
        SaleValue: 138.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jerica Tang",
        SaleValue: 995.0,
        SaleCount: 8,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jim Abbas",
        SaleValue: 299.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Johanna Signo",
        SaleValue: 29854.0,
        SaleCount: 156,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jordan Lambert",
        SaleValue: 1103.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Kayla Henry",
        SaleValue: 1384.0,
        SaleCount: 32,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Kiyah Easton",
        SaleValue: 249.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Kristen Kerr",
        SaleValue: 1032.0,
        SaleCount: 8,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Krystal Stirling",
        SaleValue: 19021.0,
        SaleCount: 171,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Luke Gilbert",
        SaleValue: 15317.0,
        SaleCount: 137,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Lynne Davidson",
        SaleValue: 17475.0,
        SaleCount: 172,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Manon Albert",
        SaleValue: 75931.5,
        SaleCount: 402,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Marvin Vicente",
        SaleValue: 249.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Matt Landmeter",
        SaleValue: 2051.0,
        SaleCount: 54,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Mel Polglaze",
        SaleValue: 4642.0,
        SaleCount: 18,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Melanie Middleton",
        SaleValue: 31499.0,
        SaleCount: 296,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Melissa Polglaze",
        SaleValue: 59.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Melissa Pudney",
        SaleValue: 10138.0,
        SaleCount: 98,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Molly Wilson",
        SaleValue: 15256.0,
        SaleCount: 64,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nathan Evans",
        SaleValue: 19381.0,
        SaleCount: 166,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nathan Parsons",
        SaleValue: 575.0,
        SaleCount: 5,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 24423.0,
        SaleCount: 112,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nick Watson",
        SaleValue: 18115.05,
        SaleCount: 149,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Pat Sullivan",
        SaleValue: 417.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Patrick Sullivan",
        SaleValue: 1121.0,
        SaleCount: 11,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Peta Seymour",
        SaleValue: 6246.0,
        SaleCount: 91,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Peta Turvey",
        SaleValue: 6160.0,
        SaleCount: 72,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Rachael Tuffen",
        SaleValue: 786.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Renee Gould",
        SaleValue: 684.0,
        SaleCount: 6,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Roger Hall",
        SaleValue: 15063.0,
        SaleCount: 87,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ross Slater",
        SaleValue: 103.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Sarah Halls",
        SaleValue: 9192.0,
        SaleCount: 144,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Shae Haefele",
        SaleValue: 45973.2,
        SaleCount: 287,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Shazelle Otto",
        SaleValue: 1272.0,
        SaleCount: 12,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Shelby Lawrence",
        SaleValue: 329.0,
        SaleCount: 4,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Steve Walker",
        SaleValue: 206326.0,
        SaleCount: 1395,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Susie Asmussen",
        SaleValue: 24987.0,
        SaleCount: 129,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Susie Bridges",
        SaleValue: 87782.0,
        SaleCount: 768,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Tarley Frost",
        SaleValue: 627.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Taylah Thornton",
        SaleValue: 1143.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Teagan Elms",
        SaleValue: 9802.0,
        SaleCount: 112,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Travers Moore",
        SaleValue: 9708.0,
        SaleCount: 85,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Victoria Smith",
        SaleValue: 99.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Wolf Haefele",
        SaleValue: 5138.0,
        SaleCount: 52,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 115.5,
        SaleCount: 1,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Jen Bautista",
        SaleValue: 115.5,
        SaleCount: 1,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Jim Abbas",
        SaleValue: 115.5,
        SaleCount: 1,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 660.66,
        SaleCount: 5,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Purnima Manori",
        SaleValue: 401.94,
        SaleCount: 3,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Tayla Lochki",
        SaleValue: 401.94,
        SaleCount: 3,
        ProductType: "PPN (6)",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 57.75,
        SaleCount: 1,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Purnima Manori",
        SaleValue: 115.5,
        SaleCount: 2,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Tayla Lochki",
        SaleValue: 434.28,
        SaleCount: 6,
        ProductType: "TMB (5)",
      },
      {
        SalesStaffName: "Chelsea De Abreu",
        SaleValue: 22.0,
        SaleCount: 1,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Jim Abbas",
        SaleValue: 66.0,
        SaleCount: 3,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 66.0,
        SaleCount: 3,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Purnima Manori",
        SaleValue: 22.0,
        SaleCount: 1,
        ProductType: "Upgrade & Protect",
      },
      {
        SalesStaffName: "Tayla Lochki",
        SaleValue: 220.0,
        SaleCount: 11,
        ProductType: "Upgrade & Protect",
      },
    ],
  },
  {
    StoreName: "Wolf - Telstra Partner",
    SalesDataaggregation: [
      {
        SalesStaffName: "Andrea Barnes",
        SaleValue: 495.0,
        SaleCount: 6,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bree Gauci",
        SaleValue: 429.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Erin Rabl",
        SaleValue: 299.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Iain Edgar",
        SaleValue: 179.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Isis Ibbetson",
        SaleValue: 237.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jake Bickerdike",
        SaleValue: 228.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jayden Leggett",
        SaleValue: 479.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Manon Albert",
        SaleValue: 231.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nick Dowdle",
        SaleValue: 658.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Nick Mackrell",
        SaleValue: 478.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Peta Seymour",
        SaleValue: 985.0,
        SaleCount: 5,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Ross Slater",
        SaleValue: 81.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Sarah Halls",
        SaleValue: 59.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Shae Haefele",
        SaleValue: 1037.0,
        SaleCount: 3,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Steve Walker",
        SaleValue: 1445.0,
        SaleCount: 5,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Susie Bridges",
        SaleValue: 196.0,
        SaleCount: 4,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Teagan Elms",
        SaleValue: 79.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Travers Moore",
        SaleValue: 49.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
    ],
  },
  {
    StoreName: "Wolf Business Centre",
    SalesDataaggregation: [
      {
        SalesStaffName: "Bec Ellul",
        SaleValue: 379.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Bree Gauci",
        SaleValue: 429.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Brett Paynter",
        SaleValue: 3128.0,
        SaleCount: 28,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Darcy Collins",
        SaleValue: 39.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Iain Edgar",
        SaleValue: 1932.0,
        SaleCount: 30,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Jacqui OSullivan",
        SaleValue: 744.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Krystal Carrick",
        SaleValue: 249.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Lisa Mackrell",
        SaleValue: 3874.0,
        SaleCount: 36,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Madelyn Minter-Barnes",
        SaleValue: 199.0,
        SaleCount: 1,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Manon Albert",
        SaleValue: 1074.0,
        SaleCount: 6,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Marvin Vicente",
        SaleValue: 2238.0,
        SaleCount: 12,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Peta Turvey",
        SaleValue: 208.0,
        SaleCount: 2,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Shae Haefele",
        SaleValue: 1585.0,
        SaleCount: 26,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
      {
        SalesStaffName: "Susie Bridges",
        SaleValue: 783.0,
        SaleCount: 7,
        ProductType: "Outright Mobile / Tablet inc Prepaid",
      },
    ],
  },
];

export async function aggregateSalesDataByStaff(data, location) {
  const aggregatedData = [];

  // Define the mapping for product type keys
  const productTypeMapping = {
    "PPN (6)": "pnncount",
    "TMB (5)": "tmbcount",
    "Outright Mobile / Tablet inc Prepaid": "outriCount",
    "Bundle New (2)": "bundelnewcount",
    "Upgrade & Protect": "upgrade",
    "DPC Mobile / Tablet": "dcpcount",
    "Handset/Plan GP": "gpvalue",
    "Smart watch": "smartWatchCount",
    "accessory GP total":"accGP",
    "Tyro Plan":"tyro"
  };

  // Get all product types
  const allProductTypes = getAllProductTypes(data);
  // console.log(allProductTypes);

  // Sort the data by StoreName in ascending order
  data.sort((a, b) => a.StoreName.localeCompare(b.StoreName));

  // Filter data by location if not "all"
  const filteredData =
    location === "all"
      ? data
      : data.filter((store) => store.StoreName === location);

  filteredData.forEach((store) => {
    const storeName = store.StoreName;

    const staffAggregations = {};

    store.SalesDataaggregation.forEach((sale) => {
      const key = sale.SalesStaffName;
      if (!staffAggregations[key]) {
        staffAggregations[key] = {
          salesrep: sale.SalesStaffName,
          SaleValue: 0,
          SaleCount: 0,
          salelocation: storeName,
        };
        // Initialize salesRecord with all product types and count as 0
        allProductTypes.forEach((productType) => {
          const mappedType = productTypeMapping[productType] || productType;
          staffAggregations[key][mappedType] = 0;
        });
      }
      staffAggregations[key].SaleCount += sale.SaleCount;
      staffAggregations[key].SaleValue += sale.SaleValue;
      const mappedType =
        productTypeMapping[sale.ProductType] || sale.ProductType;
        if (mappedType === "gpvalue" ||mappedType === "accGP" ) {
          staffAggregations[key][mappedType] += sale.SaleValue;
        } else {
          staffAggregations[key][mappedType] += sale.SaleCount;
        }
    });

    // Add the staff aggregations for this store to the final result array
    Object.values(staffAggregations).forEach((aggregation) => {
      aggregatedData.push(aggregation);
    });
  });

  return aggregatedData;
}

// Function to get all unique product types
function getAllProductTypes(data) {
  const productTypes = new Set();

  data.forEach((store) => {
    store.SalesDataaggregation.forEach((sale) => {
      productTypes.add(sale.ProductType);
    });
  });

  return Array.from(productTypes);
}
