import React, { useContext, useEffect, useState } from 'react'
import { DContext } from '../../context/Datacontext'
import { useParams } from 'react-router-dom'
import { fetchTimetableyear } from '../../service/fetchTimetable'


export const ViewTimetable = () => {
  const [timetable, setTimetable] = useState([])
  const { BeURL } = useContext(DContext)
  const { year } = useParams()

  useEffect(() => {
    if (!BeURL || !year) return

    const fetchTimetables = async () => {
      await fetchTimetableyear({ BeURL, setTimetable, year })
    }

    fetchTimetables()
  }, [BeURL, year])
  console.log("Timetable classess are :", timetable)

  return (
    <div className="mt-10">
      {timetable?.map((yearBlock) => (
        <div key={yearBlock.year} className="space-y-8">

          <h2 className="text-2xl font-bold text-teal-700">
            Year : {year}
          </h2>

          {yearBlock.classes?.map((cls) => (
            <div key={cls.classes} className="bg-white rounded-2xl shadow-lg p-6 space-y-8">

              <h3 className="text-xl font-semibold text-slate-800">
                Section : {cls.class}
              </h3>

              <div className="gap-6 lg:flex">
                {cls.days?.map((day) => (
                  <div key={day.day} className="space-y-4">

                    <h4 className="text-lg font-semibold text-primary-600 border-b pb-2 capitalize">
                      {day.day}
                    </h4>

                    <table className="w-full border rounded-lg overflow-hidden">
                      <thead className="bg-teal-100">
                        <tr>
                          <th className="p-3 text-left">Time</th>
                          <th className="p-3 text-left">Subject</th>
                          <th className="p-3 text-left">Staff</th>
                          {/* <th className="p-3 text-center">Action</th> */}
                        </tr>
                      </thead>

                      <tbody>
                        {day.periods?.map((p, i) => (
                          <tr key={i} className="border-t hover:bg-teal-50">
                            <td className="p-3">
                              {p.startTime} – {p.endTime}
                            </td>

                            <td className="p-3 font-medium">
                              {p.subject}
                            </td>

                            <td className="p-3">
                              {p.staff?.name}
                              <div className="text-xs text-gray-500">
                                {p.staff?.email}
                              </div>
                            </td>

                            {/* <td className="p-3 text-center">
                              <button
                                onClick={() =>
                                  editTimetable(p, day.day, cls.class, yearBlock.year)
                                }
                                className="px-4 py-1.5 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                              >
                                Edit
                              </button>
                            </td> */}
                          </tr>
                        ))}
                      </tbody>
                    </table>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>

  )
}
