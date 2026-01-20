import React, { useContext, useEffect, useState } from 'react'
import { DContext } from '../../context/Datacontext'
import { useParams } from 'react-router-dom'
import { fetchTimetableStaff, fetchTimetableyear } from '../../service/fetchTimetable'


export const ViewTimetable = () => {
  const [timetable, setTimetable] = useState([])
  const { BeURL, classes, currentUser } = useContext(DContext)
  const [activeStaff, setActiveStaff] = useState(null);

  const { year } = useParams()

  useEffect(() => {
    if (!BeURL || !year) return

    const fetchTimetables = async () => {
      if (currentUser.role === 'hod')
        await fetchTimetableyear({ BeURL, setTimetable, year })
      if (['staff'].includes(currentUser.role))
        await fetchTimetableStaff({ BeURL, setTimetable, year })

    }

    fetchTimetables()
  }, [BeURL, year])
  console.log("Timetable classess are :", timetable)

  const getClassLabel = (alert) => {
    console.log("alerts of", alert)
    if (!classes || classes.length === 0) return "-";

    const found = classes.find(cls =>
      cls._id === alert
      // cls.year === alert.year
    );

    if (!found) return "-";

    return `${found.number} - ${found.section}`;
  };
  return (
    <div className="mt-10 max-w-6xl mx-auto px-4 space-y-10">

      {timetable?.map((yearBlock) => (
        <div key={yearBlock.year} className="space-y-6">

          {/* YEAR HEADER */}
          <h2 className="text-2xl font-bold text-slate-900 border-b border-slate-200 pb-2">
            Academic Year : {year}
          </h2>

          {/* CLASSES */}
          {yearBlock.classes?.map((cls, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 space-y-4"
            >
              {/* SECTION HEADER */}
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-slate-800">
                  Section :
                  <span className="ml-2 text-indigo-600">
                    {getClassLabel(cls?.class[0])}
                  </span>
                </h3>

                {activeStaff && (
                  <button
                    onClick={() => setActiveStaff(null)}
                    className="text-sm text-indigo-600 hover:underline"
                  >
                    Clear staff highlight
                  </button>
                )}
              </div>

              {/* TABLE */}
              <div className="overflow-x-auto rounded-lg border border-slate-200">
                <table className="w-full border-collapse text-sm">

                  {/* HEADER */}
                  <thead className="bg-slate-100 sticky top-0 z-10">
                    <tr>
                      <th className="border border-slate-200 px-3 py-2 text-left">
                        Day
                      </th>
                      {[1, 2, 3, 4, 5].map((p) => (
                        <th
                          key={p}
                          className="border border-slate-200 px-3 py-2 text-center"
                        >
                          P{p}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  {/* BODY */}
                  <tbody>
                    {cls.days?.map((day) => (
                      <tr
                        key={day.day}
                        className="hover:bg-slate-50 transition"
                      >
                        {/* DAY */}
                        <td className="border border-slate-200 px-3 py-3 font-semibold capitalize bg-slate-50">
                          {day.day}
                        </td>

                        {/* PERIODS */}
                        {[1, 2, 3, 4, 5].map((periodNo) => {
                          const period = day.periods.find(
                            (p) => p.periodNo === periodNo
                          );

                          const isStaffMatch =
                            activeStaff &&
                            period?.staff?.name === activeStaff;

                          return (
                            <td
                              key={periodNo}
                              className={`
                                border border-slate-200 px-2 py-3 text-center align-top
                                transition
                                ${isStaffMatch
                                  ? "bg-indigo-50 ring-1 ring-indigo-400"
                                  : "bg-white hover:bg-indigo-50/40"
                                }
                              `}
                            >
                              {period ? (
                                <div className="space-y-1">

                                  {/* SUBJECT */}
                                  <div className="font-semibold text-slate-900">
                                    {period.subject}
                                  </div>

                                  {/* STAFF (CLICKABLE) */}
                                  <button
                                    onClick={() =>
                                      setActiveStaff(period.staff?.name)
                                    }
                                    className={`
                                      text-sm font-medium
                                      ${isStaffMatch
                                        ? "text-indigo-700"
                                        : "text-slate-600 hover:text-indigo-600"
                                      }
                                    `}
                                  >
                                    {period.staff?.name}
                                  </button>

                                  {/* MOBILE TIME */}
                                  <div className="block md:hidden text-xs text-slate-400">
                                    {period.startTime} – {period.endTime}
                                  </div>
                                </div>
                              ) : (
                                <span className="text-slate-300">—</span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* LEGEND */}
              <div className="flex flex-wrap gap-4 text-xs text-slate-500 pt-2">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded bg-indigo-50 ring-1 ring-indigo-400"></span>
                  Selected Staff
                </span>
                <span>Tap staff name to highlight</span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );


}
