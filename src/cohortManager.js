const Cohort = require('./cohort')

class CohortManager {
  constructor() {
    this.cohorts = []
  }

  createCohort(name) {
    const newCohort = new Cohort(name)
    this.cohorts.push(newCohort)
    return newCohort
  }

  findCohortByName(name) {
    const cohort = this.cohorts.find((cohort) => cohort.name === name)
    if (cohort !== undefined) return cohort

    return `Cohort with name ${name} does not exist.`
  }

  addStudentToCohort(cohortName, student) {
    const cohort = this.cohorts.find((cohort) => cohort.name === cohortName)

    if (cohort !== undefined) {
      cohort.addStudent(student)
      return
    }

    return `Cohort with name ${cohortName} does not exist.`
  }

  removeCohortWithName(name) {
    const cohortIndex = this.cohorts.findIndex((cohort) => cohort.name === name)

    if (cohortIndex !== -1) {
      this.cohorts.splice(cohortIndex, 1)
      return
    }

    return `Cohort with name ${name} does not exist.`
  }

  getCohorts() {
    return this.cohorts
  }

  removeStudentFromCohort(cohortName, studentId) {
    const cohort = this.cohorts.find((cohort) => cohort.name === cohortName)

    if (cohort !== undefined) {
      const result = cohort.removeStudent(studentId)
      return result
    }

    return `Cohort with name ${cohortName} does not exist.`
  }
}

module.exports = CohortManager