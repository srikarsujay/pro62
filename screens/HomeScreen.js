import * as React from 'react';
import {View,Text,TouchableOpacity,StyleSheet,Button} from 'react-native';
import db from '../config';

export default class HomeScreen extends React.Component{
constructor(){
super();
this.state={
students:[],
presentStudent:[],
absentStudent:[]
}
}



componentDidMount=async()=>{
var class_ref=await db.ref('/').on('value',data=>{
var students=[]
var class_a=data.val();
for(var i in class_a){
students.push(class_a[i]);
}
students.sort(function(a,b){
return a.roll_no-b.roll_no;
});
this.setState({students:students});
})
};



updateAttendence(roll_no, status) {
var id = '';
if (roll_no <= 5) {
id = '0' + roll_no;
} else {
id = roll_no;
}
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
var ref_path = id;
var class_ref = db.ref(ref_path);
class_ref.update({
[today]: status,
});
}






render(){
var students = this.state.students;
if (students.length === 0) {
return (
<View>
<Text>Loading...</Text>
</View>
);
} else {
return (
<View>
<View>
{students.map((student, index) => (
<View key={index}style={styles.studentChartContainer}>
<View
key={'name' + index}>
<Text style={{marginLeft:-150}}>
{student.roll_no}.
</Text>
<Text style={{marginLeft:-150,fontWeight:"bold",fontcolor:""}}>
{student.Name}
</Text>
</View>
<View>
<TouchableOpacity
style={
this.state.presentStudent.includes(index)
? [styles.present, { backgroundColor: '#65F700' }]
: styles.present
}
onPress={() => {
var presentStudent = this.state.presentStudent;
presentStudent.push(index);
this.setState({ presentStudent: presentStudent });
var roll_no = index + 1;
this.updateAttendence(roll_no, 'present');
}}>
<Text>
Present
</Text>
</TouchableOpacity>

<TouchableOpacity
style={
this.state.absentStudent.includes(index)
? [styles.absent, { backgroundColor: 'red' }]
: styles.absent
}
onPress={() => {
var absentStudent = this.state.absentStudent;
absentStudent.push(index);
this.setState({ absentStudent: absentStudent });
var roll_no = index + 1;
this.updateAttendence(roll_no, 'absent');
}}>
<Text style={{marginLeft:10}}>
Absent
</Text>
</TouchableOpacity>
</View>
</View>
))}
<View>
<TouchableOpacity 
style={styles.sumbit}
onPress={()=>{
this.props.navigation.navigate('SummaryScreen');
}}>
<Text style={styles.text}>submit</Text>
</TouchableOpacity>
</View>
</View>
</View>
);
}
}
}

const styles = StyleSheet.create({
sumbit: {
marginLeft: 70,
marginTop: 34,
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

present: {
width: 100,
height: 30,
borderColor: 'black',
justifyContent: 'center',
alignItems:'center',
marginRight:10,
borderRadius:3,
borderWidth:3,
backgroundColor:"lightgray",
fontWeight:"bold",
},

absent: {
width: 100,
height: 30,
borderColor: 'black',
justifyContent:'center',
alignItems:'center',
marginRight:10,
borderRadius:3,
borderWidth:3,
backgroundColor:"lightgray",
fontWeight:"bold",
},

studentChartContainer: {
flexDirection: 'row',
padding: 10,
alignItems: 'center',
marginLeft: 150,
},
})

