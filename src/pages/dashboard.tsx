import { Box, Flex, SimpleGrid, Text, theme } from "@chakra-ui/react";
import { Header } from "~/components/Header";
import { Sidebar } from "~/components/Sidebar";
import dynamic from 'next/dynamic';
import { Props } from 'react-apexcharts';
import Head from "next/head";

const Chart = dynamic(() => import('react-apexcharts'), {
  ssr: false
});

const options: Props['options'] = {
  chart: {
    toolbar: {
      show: false
    },
    zoom: {
      enabled: false
    },
    foreColor: theme.colors.gray[500]
  },
  grid: {
    show: false
  },
  dataLabels: {
    enabled: false
  },
  tooltip: {
    enabled: false
  },
  xaxis: {
    type: "datetime",
    axisBorder: {
      color: theme.colors.gray[600]
    },
    axisTicks: {
      color: theme.colors.gray[600]
    },
    categories: [
      '2022-05-02T00:00:00.000Z',
      '2022-05-03T00:00:00.000Z',
      '2022-05-04T00:00:00.000Z',
      '2022-05-05T00:00:00.000Z',
      '2022-05-06T00:00:00.000Z',
      '2022-05-07T00:00:00.000Z',
      '2022-05-08T00:00:00.000Z',
    ]
  },
  fill: {
    opacity: 0.3,
    type: 'gradient',
    gradient: {
      shade: 'dark',
      opacityFrom: 0.7,
      opacityTo: 0.3
    }
  }
};

const series = [
  { name: 'series1', data: [31, 120, 10, 28, 13, 21, 60] }
];

export default function Dashboard() {
  return (
    <>
      <Head>
        <title>Dashgo | Dashboard</title>
      </Head>

      <Flex
        direction="column"
        h="100vh"
      >
        <Header />

        <Flex
          width="100%"
          my="6"
          maxWidth={1480}
          mx="auto"
          px="6"
        >
          <Sidebar />

          <SimpleGrid width='100%' maxWidth='1144' gap="4" minChildWidth="320px" alignItems="flex-start">
            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">Inscritos da semana</Text>
              <Chart type="area" height={168} options={options} series={series} />
            </Box>

            <Box p={["6", "8"]} bg="gray.800" borderRadius={8} pb="4">
              <Text fontSize="lg" mb="4">Taxa de abertura</Text>
              <Chart type="area" height={168} options={options} series={series} />
            </Box>
          </SimpleGrid>
        </Flex>
      </Flex>
    </>
  );
}