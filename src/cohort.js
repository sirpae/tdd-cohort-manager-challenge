lass Cohort {
    constructor(name) {
      this.name = name
      this.students = []
    }
  
    getName() {
      return this.name
    }
  
    setName(newName) {
      this.name = newName
    }
  
    addStudent(student) {
      this.students.push(student)
    }
  
    getStudents() {
      return this.students
    }
  
    removeStudent(studentId) {
      const studentIndex = this.students.findIndex(
        (student) => student.studentId === studentId
      )
  
      if (studentIndex !== -1) {
        this.students.splice(studentIndex, 1)
        return
      }
  
      return `Student with id ${studentId} does not exist.`
    }
  }
  
  module.exports = Cohort