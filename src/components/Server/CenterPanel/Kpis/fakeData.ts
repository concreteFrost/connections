import { faker } from "@faker-js/faker";
export const lineChartLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
export const lineChart = {
  options: {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  },
  dataSets: [
    {
      label: "Dataset 1",
      data: lineChartLabels.map(() =>
        faker.number.int({ min: -1000, max: 1000 })
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: lineChartLabels.map(() =>
        faker.number.int({ min: -1000, max: 1000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export const doughnutLabels = [
  "Red",
  "Blue",
  "Yellow",
  "Green",
  "Purple",
  "Orange",
];
export const doughnutChart = {
  options: {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  },
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const groupedLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
export const groupedChat = {
  options: {
    maintainAspectRatio: false,
    responsive: false,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  },

  datasets: [
    {
      label: "Dataset 1",
      data: groupedLabels.map(() =>
        faker.number.int({ min: -1000, max: 1000 })
      ),
      backgroundColor: "rgb(255, 99, 132)",
      stack: "Stack 0",
    },
    {
      label: "Dataset 2",
      data: groupedLabels.map(() =>
        faker.number.int({ min: -1000, max: 1000 })
      ),
      backgroundColor: "rgb(75, 192, 192)",
      stack: "Stack 0",
    },
    {
      label: "Dataset 3",
      data: groupedLabels.map(() =>
        faker.number.int({ min: -1000, max: 1000 })
      ),
      backgroundColor: "rgb(53, 162, 235)",
      stack: "Stack 1",
    },
  ],
};

export const pieChartLabels = ["Red", "Blue", "Yellow", "Green", "Purple"];
export const pieChartsData = {
  options: {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        position: "bottom" as const,
      },
    },
  },
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(153, 102, 255, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(153, 102, 255, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const scatterData = {
  options: {
    maintainAspectRatio: false,
    responsive: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
  datasets: [
    {
      label: "A dataset",
      data: Array.from({ length: 100 }, () => ({
        x: faker.number.int({ min: -100, max: 100 }),
        y: faker.number.int({ min: -100, max: 100 }),
      })),
      backgroundColor: "rgba(255, 99, 132, 1)",
    },
  ],
};

export const verticalLabels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
];
export const verticalData = {
  options: {
    maintainAspectRatio: false,
    responsive: false,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  },
  dataSets: [
    {
      label: "Dataset 1",
      data: verticalLabels.map(() =>
        faker.number.int({ min: -1000, max: 1000 })
      ),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Dataset 2",
      data: verticalLabels.map(() =>
        faker.number.int({ min: -1000, max: 1000 })
      ),
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};
