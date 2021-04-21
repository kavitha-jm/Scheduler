import React, {Component} from 'react';
import {DayPilot, DayPilotCalendar, DayPilotNavigator} from "daypilot-pro-react";
import WeekScheduleService from "../services/week.service";

const styles = {
  wrap: {
    display: "flex"
  },
  left: {
    marginRight: "10px"
  },
  main: {
    flexGrow: "1"
  }
};

class WeekTemplate extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          "id": "1",
          "text": "Event 1",
          "start": "2021-04-23T10:30:00",
          "end": "2021-04-23T13:00:00"
         },
        {
          "id": "2",
          "text": "Event 2",
          "start": "2021-04-19T09:30:00",
          "end": "2021-04-19T11:30:00",
          "backColor": "#38761d"
        },
        {
          "id": "3",
          "text": "Event 3",
          "start": "2021-04-21T12:00:00",
          "end": "2021-04-21T15:00:00",
          "backColor": "#cc4125"
        },
      ],
      viewType: "Week",
      durationBarVisible: false,
      timeRangeSelectedHandling: "Enabled",
      onTimeRangeSelected: args => {
        var v = "";
        let dp = this.CalendarTemplate;
        DayPilot.Modal.prompt("Create a new event:", "Event 1").then(function(modal) {
          dp.clearSelection();
          if (!modal.result) { return; }
           var e= new DayPilot.Event({
            id: DayPilot.guid(),
            text: modal.result,
            start: args.start,
            end: args.end
           
          })
          v= modal.result;
          console.log("e name ",v)
          dp.events.add(e);
          
          
        });
        console.log("e1 name ",v);
      
      },
      

      eventDeleteHandling: "Update",
      onEventClick: args => {
        let dp = this.CalendarTemplate;
        DayPilot.Modal.prompt("Update event text:", args.e.text()).then(function(modal) {
          if (!modal.result) { return; }
          args.e.data.text = modal.result;
          dp.events.update(args.e);
          
        });
      },
    };
  }

  componentDidMount() {

    // load event data
    this.setState({
      startDate:DayPilot.Date.today(),
      events: [
        {
          "id": "1",
          "text": "Event 1",
          "start": "2021-04-23T10:30:00",
          "end": "2021-04-23T13:00:00"
         },
        {
          "id": "2",
          "text": "Event 2",
          "start": "2021-04-19T09:30:00",
          "end": "2021-04-19T11:30:00",
          "backColor": "#38761d"
        },
        {
          "id": "3",
          "text": "Event 3",
          "start": "2021-04-21T12:00:00",
          "end": "2021-04-21T15:00:00",
          "backColor": "#cc4125"
        },
      ]
    });
  }
  
  saveWeekSchedule(e) {
    console.log("save week sch",e)
    WeekScheduleService.create(e)
  }

  render() {
    var {...config} = this.state;
    console.log("hi",this.state.events)
    
    return (
      <div style={styles.wrap}>
        <div style={styles.left}>
          <DayPilotNavigator
            selectMode={"week"}
            showMonths={3}
            skipMonths={3}
            onTimeRangeSelected={ args => {
              this.setState({
                startDate: args.day
              });
            }}
          />
        </div>
        <div style={styles.main}>
        <DayPilotCalendar
          {...config}
          ref={component => {
            this.CalendarTemplate = component && component.control;
          }}
        />
        </div>
        <button 
        className="savebutton  m-3 btn btn-sm"
        value={this.state.events}
        onClick={this.saveWeekSchedule}><b>SAVE</b></button> 
      </div>
    );
  }
}

export default WeekTemplate;