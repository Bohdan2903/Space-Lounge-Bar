import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { requestApiEmployees } from '../store/common/actions'
import { RootState } from '../store/configureStore'
import Employers from '../components/Employers'

const EmployeesPage = () => {
  const dispatch = useDispatch()
  const requestEmployers = useSelector((state: RootState) => state.common.employers)
  const [activeEmployers, setActiveEmployers] = useState([])
  const [sortedActiveEmployees, setSortedActiveEmployees] = useState({})

  useEffect(() => {
    dispatch(requestApiEmployees())
  }, [])

  useEffect(() => {
    const active = localStorage.getItem('activeEmployers')
    // @ts-ignore
    if (active && Object.keys(active).length > 0) {
      const parseActive = active && JSON.parse(active)
      // @ts-ignore
      return setSortedActiveEmployees(parseActive)
    }
  }, [])


  const sorterEmployers = requestEmployers?.sort((a: any, b: any) => a.lastName.localeCompare(b.lastName))
    .reduce((acc: any, curr: any) => {
      acc[curr] = { letter: curr.lastName.substr(0, 1), ...curr }
      acc.push(acc[curr])
      return acc
    }, [])
  // @ts-ignore
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').reduce((acc, curr) => (acc[curr] = curr, acc), {})

  const sortedGroups = (sorterEmployers: []) => {
    if (sorterEmployers?.length > 0) {
      return Object.keys(alphabet).reduce((acc: any, curr: any) => {
        const children: any[] = []
        sorterEmployers.map((elem: any) => {
          if (elem.letter.indexOf(curr) !== -1) {
            children.push(elem)
          }
          return acc[curr] = { children }
        })
        return acc
      }, {})
    }
  }

  const memoizedEmployees = useMemo(() => sorterEmployers?.length > 0 && sortedGroups(sorterEmployers), [sorterEmployers])

  const sortedByMonth = (activeEmployers: any[] | undefined) => {
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].reduce((acc, curr) => {
      const employeesDob: { name: any; birthday: any }[] = []
      // @ts-ignore
      if(activeEmployers?.length > 0){
        activeEmployers?.map(({ key, name, birthday,active }: any) => {
          const month = new Date(birthday).getMonth() + 1
          if (+curr === month) {
            // @ts-ignore
            employeesDob.push({ key, name, birthday,active })
            // @ts-ignore
            acc[curr] = { key: month, children: employeesDob }
          }
        })
      }
      return acc
    }, {})
  }

  useMemo(() => setSortedActiveEmployees(sortedByMonth(activeEmployers)), [activeEmployers])

  useEffect(() => {
    localStorage.setItem('activeEmployers', JSON.stringify(sortedActiveEmployees))
  }, [sortedActiveEmployees])


  if (!requestEmployers) {
    return (
      <div id="page-loader">
        <p>Page is loading</p>
      </div>
    )
  }


  return (
    <div className={'wrapper'}>
      <h1>Employees</h1>
      <div className={'employers'}>
        <div className={'left-side'}>
          {Object.keys(memoizedEmployees)?.map((letter) => {
            return (
              <Employers key={letter}
                         activeEmployers={activeEmployers}
                         setActiveEmployers={setActiveEmployers}
                         sortedActiveEmployees={sortedActiveEmployees}
                         letter={letter}
                         children={memoizedEmployees[letter].children}/>
            )
          })}
        </div>
        <div className={'right-side'}>
          <h2>Employers Birthday</h2>
          {!sortedActiveEmployees || Object.keys(sortedActiveEmployees)?.length < 1 &&
          <h3> Employees List is empty</h3>}
          {Object.keys(sortedActiveEmployees)?.length > 0 && Object.keys(sortedActiveEmployees)?.sort((month): any => {
            const currMonth = new Date().getMonth() + 1
            if (+month <= currMonth) return -1
            if (+month > currMonth) return 0
          }).map((month) => {
            const newMonth = new Date().setMonth(+month - 1)
            // @ts-ignore
            const children = sortedActiveEmployees[month].children
            return (
              <div key={month}>
                <h3>{new Date(newMonth).toLocaleDateString('en-US', { month: 'long' })}</h3>
                {children.map(({ name, birthday }: any) => (
                  <p>{name} - {new Date(birthday).toLocaleDateString('pt-PT')}</p>
                ))}
              </div>
            )
          })
          }
        </div>
      </div>
    </div>
  )
}


export default EmployeesPage
