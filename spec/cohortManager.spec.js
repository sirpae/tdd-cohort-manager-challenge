const CohortManager = require('../src/cohortManager.js')
const Student = require('../src/student.js')

describe('Cohort Manager', () => {
  let cohortManager = new CohortManager()

  beforeEach(() => {
    cohortManager = new CohortManager()
  })

  it ('can create cohort manager with a name', () => {
    const name = 'A new cohort.'
    const newCohort = cohortManager.createCohort(name)
    expect(newCohort.getName()).toEqual(name)
  })

  it ('can find a cohort with a given name', () => {
    const name = 'A new cohort.'
    cohortManager.createCohort(name)
    
    const foundCohort = cohortManager.findCohortByName(name)
    expect(foundCohort.getName()).toEqual(name)
  })

  it ('a nonexistent cohort returns an error', () => {
    const name = 'some random name'
    const errorText = cohortManager.findCohortByName(name)
      
    expect(errorText).toEqual(`Cohort with name ${name} does not exist.`)
  })

  it ('can add a student to a specific cohort', () => {
    // Create a new cohort with no students.
    const name = 'some random name'
    const newCohort = cohortManager.createCohort(name)
    let cohortStudents = newCohort.getStudents()
    expect(cohortStudents.length).toEqual(0)

    const student = new Student({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      githubUsername: 'john',
      studentId: 1
    })
    cohortManager.addStudentToCohort(name, student)

    cohortStudents = newCohort.getStudents()
    expect(cohortStudents.length).toEqual(1)
    expect(cohortStudents[0].studentId).toEqual(student.studentId)
  })

  it ('cannot add a student to a cohort that does not exist', () => {
    const studentName = 'Joshua'
    const student = new Student(studentName)

    const someFakeCohortName = 'blah'
    const errorText = cohortManager.addStudentToCohort(someFakeCohortName, student)

    expect(errorText).toEqual(`Cohort with name ${someFakeCohortName} does not exist.`)
  })

  it ('can remove a cohort by name', () => {
    const name = 'A new cohort.'
    cohortManager.createCohort(name)
    expect(cohortManager.getCohorts().length).toEqual(1)

    cohortManager.removeCohortWithName(name)
    expect(cohortManager.getCohorts().length).toEqual(0)
  })

  it ('cannot remove a cohort if it does not exist', () => {
    const name = 'A new cohort.'
    const errorText = cohortManager.removeCohortWithName(name)

    expect(errorText).toEqual(`Cohort with name ${name} does not exist.`)
    expect(cohortManager.getCohorts().length).toEqual(0)
  })

  it ('can remove student from a cohort', () => {
    // Create a new cohort with no students.
    const name = 'some random name'
    const newCohort = cohortManager.createCohort(name)
    let cohortStudents = newCohort.getStudents()
    expect(cohortStudents.length).toEqual(0)

    const student = new Student({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      githubUsername: 'john',
      studentId: 1
    })
    cohortManager.addStudentToCohort(name, student)

    cohortStudents = newCohort.getStudents()
    expect(cohortStudents.length).toEqual(1)
    expect(cohortStudents[0].studentId).toEqual(student.studentId)

    cohortManager.removeStudentFromCohort(name, student.studentId)
    cohortStudents = newCohort.getStudents()
    expect(cohortStudents.length).toEqual(0)
  })

  it ('cannot remove student from a cohort if they are not in the cohort', () => {
    // Create a new cohort with no students.
    const name = 'some random name'
    const newCohort = cohortManager.createCohort(name)
    let cohortStudents = newCohort.getStudents()
    expect(cohortStudents.length).toEqual(0)

    const errorText = cohortManager.removeStudentFromCohort(name, 999)
    cohortStudents = newCohort.getStudents()
    expect(cohortStudents.length).toEqual(0)
    expect(errorText).toEqual(`Student with id ${999} does not exist.`)
  })

  it ('cannot remove student from a cohort that does not exist.', () => {
    const cohortName = 'some random name'
    const errorText = cohortManager.removeStudentFromCohort(cohortName, 999)

    expect(errorText).toEqual(`Cohort with name ${cohortName} does not exist.`)
  })
})
