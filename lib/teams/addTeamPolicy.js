//adds an IAM policy of a newly created stack to an existing group or team

function addTeamPolicy(group, policy){
  var params = {
    GroupName: group, 
    PolicyArn: policy
  };
  iam.attachGroupPolicy(params, function(err, data) {
    if (err) console.log(err, err.stack); // an error occurred
    else     console.log(data);           // successful response
  });
}