function skillsMembers() {
  return {
    restrict: 'E',
    templateUrl: 'skills-members.html',
    scope: {
      members: '=',
      skills: '=',
      title: '@'
    }
  };
}