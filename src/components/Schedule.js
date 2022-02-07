import React, { useState, useEffect } from "react";
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
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";

const resourceData = [
  { Name: "Dr Janinia", id: 1, Color: "#ea7a57", designation: "Cardiologist" },
  { Name: "Dr Max", id: 2, Color: "#357CD2", designation: "Neurologist" },
  {
    Name: "Dr Oskar",
    id: 3,
    Color: "#7fa900",
    designation: "Orthopedic Surgeon",
  },
];

const groupData = {
  resources: ["Resources"],
};
const getDoctorName = (value) => {
  return value.resourceData
    ? value.resourceData[value.resource.textField]
    : value.resourceName;
};
const getDoctorLevel = (value) => {
  let resourceName = getDoctorName(value);
  return resourceName === "Dr Janinia"
    ? "Cardiologist"
    : resourceName === "Dr Max"
    ? "Neurologist"
    : "Orthopedic Surgeon";
};
const resourceHeaderTemplate = (props) => {
  return (
    <div className="template-wrap">
      <div className="resource-detail">
        <div className="resource-name">{getDoctorName(props)}</div>
        <div className="resource-designation">{getDoctorLevel(props)}</div>
      </div>
    </div>
  );
};
function Schedule() {
  const [appointments, setAppointments] = useState({});

  useEffect(() => {
    axios.get("http://localhost:5000/appointments").then((res) => {
      setAppointments(res.data);
    });
  }, []);

  const onActionComplete = ({ requestType, data }) => {
    if (data) data = data[0];

    switch (requestType) {
      case "eventCreated":
        axios.post(`http://localhost:5000/appointments`, data);
        break;
      case "eventRemoved":
        axios.delete(`http://localhost:5000/appointments/${data.id}`);
        break;
      case "eventChanged":
        axios.put(`http://localhost:5000/appointments/${data.id}`, data);
        break;
    }
  };

  return (
    <Grid container direction="row">
      <Grid item>
        <ScheduleComponent
          resourceHeaderTemplate={resourceHeaderTemplate}
          currentView="TimelineViews"
          eventSettings={{ dataSource: appointments }}
          showWeekend={false}
          selectedDate={new Date(2019, 4, 8)}
          startHour="10:00"
          endHour="19:00"
          actionComplete={onActionComplete}
          group={groupData}
          showQuickInfo={false}
        >
          <ResourcesDirective>
            <ResourceDirective
              field="ResourceID"
              title="Lekarz"
              name="Resources"
              textField="Name"
              idField="id"
              colorField="Color"
              dataSource={resourceData}
            ></ResourceDirective>
          </ResourcesDirective>
          <Inject
            services={[
              Day,
              Week,
              WorkWeek,
              Month,
              Agenda,
              TimelineViews,
              DragAndDrop,
            ]}
          />
        </ScheduleComponent>
      </Grid>
    </Grid>
  );
}

export default Schedule;
