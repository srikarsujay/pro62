import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Button} from 'react-native';
import db from '../config';

export default class SummaryScreen extends React.Component{
constructor() {
    super();
    this.state = {
      present_students:[],
      absent_students:[],
    };
  }

getTodaysDate(){
var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

var yyyy = today.getFullYear();
if (dd < 10) {
dd = '0' + dd;
}
if (mm < 10) {
mm = '0' + mm;
}
today = dd + '-' + mm + '-' + yyyy;
return today;
}

componentDidMount = async () => {
var today = await this.getTodaysDate();
var students_ref = db.ref('/').on('value',(data)=>{
var class_a=data.val();
var present_students = []
var absent_students = []
for(var i in class_a){
if(class_a[i][today] === 'present'){
present_students.push(class_a[i])
}
if(class_a[i][today] === 'absent'){
absent_students.push(class_a[i])
}
}

present_students.sort(function(a, b) {
return a.roll_no - b.roll_no;
});

absent_students.sort(function(a, b) {
return a.roll_no - b.roll_no;
});

this.setState({
present_students : present_students,
absent_students : absent_students
})
})
};

render() {
return (
<View style={{ flex: 1, backgroundColor: 'yellow' }}>

<Text style={{color:'blue',fontSize:25,marginLeft:-1,marginTop:-30,backgroundColor:'lightgreen',textAlign:"center"}}>
Total Students:5
</Text>

<Text style={{color: 'BLACK',fontSize:20,marginLeft:70,marginTop:50,}}>
Present Students List</Text>
<View>
{this.state.present_students.map((student, index) => (
<Text>
{student.Name}
</Text>
))}

</View>
<Text style={{color: 'black',fontSize:20,marginLeft:70,marginTop:70}}>Absent Students List</Text>
<View>
{this.state.absent_students.map((student, index) => (
<Text>
{student.Name}
</Text>
))}

</View>

<Text style={{color:'blue',fontSize:15,marginLeft:80,marginTop:-190}}>
Total Students Present: {this.state.present_students.length}
</Text>

<Text style={{color:'blue',fontSize:15,marginLeft:70,marginTop:70}}>
Total Students Absent: {this.state.absent_students.length}
</Text>

<TouchableOpacity 
style={styles.sumbit}
onPress={()=>{
this.props.navigation.navigate('HomeScreen');
}}>
<Text style={styles.text}>Go Back</Text>
</TouchableOpacity>

</View>
);
}
}

const styles = StyleSheet.create({
sumbit: {
   marginLeft: 70,
    marginTop: 230,
    height: 60,
    width: 200,
    alignItems: 'center',
    justifyContent: 'center',
    fill: 'white',
    borderWidth: 4,
    borderColor: 'blue',
    backgroundColor: 'indigo',
  },

  text: {
    alignItems: 'center',
    justifyContent: 'center',
    fill: 'white',
    color: 'white',
    fontSize:20
  },

})




