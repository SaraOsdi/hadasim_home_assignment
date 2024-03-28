import { LastMonthInfo } from "../components/LastMonthChart.tsx";
import { coronaAllInfo } from "../api/coronaInfo.tsx";

import {
  useQuery /* useMutation, useQueryClient*/,
} from "@tanstack/react-query";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import { Text, Paper } from "@mantine/core";

export function DashboardPage() {
  const {
    data: coronaInfo,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["coronaInfo"],
    queryFn: coronaAllInfo,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div style={{ paddingTop: "3vh", marginRight: "10vh", marginLeft: "10vh" }}>
      <Link to={"/"}>
        <Button
          color="blue"
          variant="outline"
          size="md"
          style={{ marginTop: "5vh" }}
        >
          Back To Main Page
        </Button>
      </Link>
      <LastMonthInfo lastMonthInfo={coronaInfo?.lastMonthDataResults} />
      <div
        style={{
          padding: "16px",
          display: "flex",
          alignSelf: "center",
        }}
      >
        <Paper
          style={{ margin: "auto", width: "10%", height: "10%" }}
          shadow="xl"
          radius="xl"
          p="xl"
          withBorder
        >
          <Text ta="center" size="50px" fw={800}>
            {coronaInfo?.howManyNotVaccinatedResults}
          </Text>
        </Paper>
      </div>
    </div>
  );
}
