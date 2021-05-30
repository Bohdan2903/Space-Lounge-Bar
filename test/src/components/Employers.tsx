import { useMemo } from 'react'
import { useEffect, useState } from 'react'


interface Employers {
  children?: []
  letter: string
  setActiveEmployers: any
  activeEmployers: any,
  sortedActiveEmployees?: any
}

const EmployersBlock = ({
                          letter,
                          children,
                          setActiveEmployers,
                          activeEmployers,
                          sortedActiveEmployees,
                        }: Employers) => {
  const [employees, setEmployees] = useState(children)
  const toggleActiveEmployers = (elem: any) => {
    const name = elem.target.name
    const index = elem.target.dataset.index
    const birthday = elem.target.dataset.birthday
    const isFind = activeEmployers?.some((item: any) => item.key === index)
    if (elem.target.value === 'true') {
      const activeItem = { key: index, name, birthday, active: true}
      const newEmployers = [...activeEmployers, activeItem]
      !isFind &&  setActiveEmployers(newEmployers)
    }
   else{
     const filteredEmployers = activeEmployers.filter((item: any) => item.key !== index)
     setActiveEmployers(filteredEmployers)
   }
  }

  const newEmployees = employees?.reduce((acc: any, curr: any) => {
      if (Object.keys(sortedActiveEmployees)?.length > 0) {
        Object.keys(sortedActiveEmployees)?.map((item): any => {
          if (sortedActiveEmployees[item].children?.some((elem: any) => elem.key === curr.id)) {
            acc[curr] = { ...curr, active: true }
          } else {
            acc[curr] = { ...curr}
          }
        })
      } else {
        acc[curr] = { ...curr,active: false }
      }
      acc.push(acc[curr])
      return acc
    }, [])

  useMemo(() => setEmployees(newEmployees), [activeEmployers, sortedActiveEmployees])

  return (
    <div key={letter} className={'employer-info-wrapper'}>
      <h2>{letter}</h2>
      {employees?.map(({ id, firstName, lastName, dob, active }) => {
        const fullName = `${lastName} ${firstName}`
        return (
          <div className={'employer-info'} key={id}>
            <p data-index={id} className={active ? 'active' : ''}>{fullName}</p>
            <label htmlFor="">
              <input type="radio" value={'false'} data-index={id}
                     name={fullName} data-birthday={dob}
                     checked={!active}
                     onChange={toggleActiveEmployers}
              />Not active
            </label>
            <label htmlFor="">
              <input type="radio" value={'true'} data-index={id}
                     checked={active}
                     data-birthday={dob} name={fullName}
                     onChange={toggleActiveEmployers}/>
              Active</label>
          </div>
        )
      })}
      {!employees || employees?.length <= 0 && (<h3>-</h3>)}
    </div>
  )
}
export default EmployersBlock