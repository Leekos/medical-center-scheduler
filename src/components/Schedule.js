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
  ResourceDirective,
  ResourcesDirective,
  DragAndDrop,
} from "@syncfusion/ej2-react-schedule";
import axios from "axios";
import { DateTimePickerComponent } from "@syncfusion/ej2-react-calendars";
import { DropDownListComponent } from "@syncfusion/ej2-react-dropdowns";

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

  const editorTemplate = (props) => {
    console.log(props);
    return (
      <table className="custom-event-editor">
        <tbody>
          <tr>
            <td className="e-textlabel">Name and Surname</td>
            <td>
              <input
                id="Name"
                name="Subject"
                type="text"
                className="e-field e-input"
              ></input>
            </td>
          </tr>

          <tr>
            <td className="e-textlabel">Doctor</td>
            <td>
              <DropDownListComponent
                id="ResourceID"
                dataSource={resourceData}
                fields={{
                  text: "Name",
                  value: "id",
                }}
                placeholder="Choose doctor"
                name="ResourceID"
                className="e-field"
                value={props.ResourceID || null}
              ></DropDownListComponent>
            </td>
          </tr>

          <tr>
            <td className="e-textlabel">Status</td>
            <td>
              <DropDownListComponent
                id="EventType"
                dataSource={["New", "Confirmed"]}
                placeholder="Choose status"
                name="EventType"
                className="e-field"
                value={props.EventType || null}
              ></DropDownListComponent>
            </td>
          </tr>

          <tr>
            <td className="e-textlabel">From</td>

            <td>
              <DateTimePickerComponent
                id="StartTime"
                name="StartTime"
                className="e-field"
                value={new Date(props.startTime || props.StartTime)}
                format="dd/MM/yy hh:mm a"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">To</td>
            <td>
              <DateTimePickerComponent
                id="EndTime"
                data-name="EndTime"
                className="e-field"
                value={new Date(props.startTime || props.StartTime)}
                format="dd/MM/yy hh:mm a"
              ></DateTimePickerComponent>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Reason</td>
            <td>
              <textarea
                id="Reason"
                className="e-field e-input"
                name="Reason"
                rows={3}
                cols={50}
                style={{
                  width: "100%",
                  height: "60px !important",
                  resize: "vertical",
                }}
              ></textarea>
            </td>
          </tr>
          <tr>
            <td className="e-textlabel">Description</td>
            <td>
              <textarea
                id="Description"
                className="e-field e-input"
                name="Description"
                rows={3}
                cols={50}
                style={{
                  width: "100%",
                  height: "60px !important",
                  resize: "vertical",
                }}
              ></textarea>
            </td>
          </tr>
        </tbody>
      </table>
    );
  };

  const onActionComplete = ({ requestType, data }) => {
    console.log(requestType);
    console.log(data);

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
  }; // obsługa bazy danych

  return (
    <Grid container direction="row">
      <Grid item>
        <ScheduleComponent
          resourceHeaderTemplate={resourceHeaderTemplate}
          currentView="TimelineViews"
          eventSettings={{ dataSource: appointments }}
          showWeekend={false}
          startHour="10:00"
          endHour="19:00"
          actionComplete={onActionComplete}
          group={groupData}
          showQuickInfo={false}
          editorTemplate={editorTemplate} // w przykładzie jest  this.nazwa.bind(this)
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
