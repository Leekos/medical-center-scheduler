import React from "react";
import { Grid } from "@mui/material";
import {
  Inject,
  ScheduleComponent,
  Day,
  Week,
  WorkWeek,
  Month,
  Agenda,
  TimelineViews,
  EventSettingsModel,
  ResourceDirective,
  ResourcesDirective,
} from "@syncfusion/ej2-react-schedule";

import { DataManager, WebApiAdaptor } from "@syncfusion/ej2-data";

const remoteData = new DataManager({
  url: "localhost:3000/db.json",
  adaptor: new WebApiAdaptor(),
  crossDomain: true,
});
const localData = [
  {
    Id: 1,
    Subject: "Anna Kowalska",
    StartTime: new Date(2019, 4, 8, 6, 0),
    EndTime: new Date(2019, 4, 8, 7, 0),
    ResourceID: 1,
  },
  {
    Id: 2,
    Subject: "Marek Kowalski",
    StartTime: new Date(2019, 4, 9, 7, 30),
    EndTime: new Date(2019, 4, 9, 8, 30),
    ResourceID: 2,
  },
  {
    Id: 3,
    Subject: "Anna Nowak",
    StartTime: new Date(2019, 4, 10, 9, 0),
    EndTime: new Date(2019, 4, 10, 10, 0),
    ResourceID: 3,
  },
];
const resourceDataSource = [
  { Name: "Dr Janinia", Id: 1, Color: "#ea7a57" },
  { Name: "Dr Max", Id: 2, Color: "#357CD2" },
  { Name: "Dr Oskar", Id: 3, Color: "#7fa900" },
];
function Schedule() {
  return (
    <Grid container direction="row">
      <Grid item>
        <ScheduleComponent
          currentView="TimelineViews"
          selectedDate={new Date(2019, 4, 8)}
          eventSettings={{ dataSource: localData }}
        >
          <ResourcesDirective>
            <ResourceDirective
              field="ResourceID"
              title="Lekarz"
              name="Resources"
              textField="Name"
              idField="Id"
              colorField="Color"
              dataSource={resourceDataSource}
            ></ResourceDirective>
          </ResourcesDirective>
          <Inject
            services={[Day, Week, WorkWeek, Month, Agenda, TimelineViews]}
          />
        </ScheduleComponent>
      </Grid>
    </Grid>
  );
}

export default Schedule;
