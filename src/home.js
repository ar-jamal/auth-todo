import { useEffect, useState } from 'react';
import app, { auth } from "../config/firebaseConfig";
import { getDatabase, ref, set, push, get, child, onValue, update, remove } from "firebase/database";
import Button from '../utils/Components/CusButton';
import { logout } from '../config/firebaseMethods';
import { useLocation, useParams } from 'react-router-dom';
function Home() {
  // const si

  const db = getDatabase(app);
  const location = useLocation();
  // const params = useParams();
  let [txt, setTxt] = useState("")
  // let [value, setValue] = useState("")
  // let [titleBut, setTitleBut] = useState('add')
  let [selected, setSelected] = useState(null)
  let [list, setList] = useState({})

  useEffect(() => {
    if (auth.currentUser?.uid) {
      const dbRef = ref(getDatabase());
      let uid = auth.currentUser.uid
      // console.log(uid)

      return onValue(child(dbRef, `users/${uid}/todos`), (snapshot) => {
        if (snapshot.exists()) {
          setList(snapshot.val())
        } else {
          setList({})
          console.log("No data available");
        }
      }, (error) => {
        console.error(error);
      })
    }
  }, [])

  function add() {
    if (!txt) {
      alert('text is required')
      return
    }

    let uid = auth.currentUser.uid
    const reference = ref(db, `users/${uid}/todos`)
    let obj = {
      user: uid,
      title: txt,
      date: (new Date()).toString()
    }

    push(reference, obj)
      .then(() => {
        setTxt('')
        console.log("todo Added Successfully")
      })
      .catch((errr) => {
        console.log(errr)
      })
  }
  function deleteAll() {
    // setList([])
    let uid = auth.currentUser.uid
    const reference = ref(db, `users/${uid}/todos`)
    remove(reference).then(() => {
      setSelected(null)
      setTxt('')
    })
  }
  function deleteId(id) {
    let uid = auth.currentUser.uid
    const reference = ref(db, `users/${uid}/todos/${id}`)
    remove(reference)
  }
  function editId(obj) {
    setSelected({ ...obj })
    setTxt(obj.text)
  }
  async function updateItem() {
    let uid = auth.currentUser.uid
    const reference = ref(db, `users/${uid}/todos/${selected.i}`)
    update(reference, {
      title: txt
    }).then(() => {
      setSelected(null)
      setTxt('')
    })
  }
  function cancel() {
    setSelected(null)
    setTxt('')
  }
  // console.log(location)
  const isUpdate = !!selected
  // console.log(list)
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ width: '280' }} >
          <h3 style={{ color: "white" }} >{location.state}</h3>
          <div style={{ flexDirection: 'row', width: '100%' }} >
            <input
              // style={{ width: '100%' }}
              onChange={(e) => {
                setTxt(e.target.value)
                console.log(txt)
              }}
              value={txt}
            />
            <Button click={logout} titleBut={'Sign out'} />
          </div>
          <div style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }} >
            <Button style={{ margin: 8 }} titleBut={isUpdate ? "update" : 'add'} click={isUpdate ? updateItem : add} />
            {isUpdate &&
              <Button style={{ margin: 8 }} titleBut={'cancel'} click={cancel} />
            }
            <Button style={{ margin: 8 }} titleBut={'delete all'} click={deleteAll} />
          </div>
        </div>

        <ul style={{ flexDirection: 'row', padding: 8 }}>{
          Object.keys(list).map((key, i) => {
            const e = list[key]
            return <li
              style={{
                color: 'white',
                backgroundColor: 'grey',
                margin: 6,
                minWidth: 200,
                display: 'flex',
                justifyContent: 'space-between',
                padding: 12,
              }}
              key={i}
            >
              <div style={{
                flex: 1,
                // backgroundColor: 'red',
                width: '50%',
                textAlign: 'left',
                flexWrap: 'wrap'
              }}
              >
                {e.title}
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                <Button
                  titleBut={'edit'}
                  click={() => { editId({ text: e.title, i: key }) }}
                />
                <Button
                  titleBut={'delete'}
                  click={() => {
                    deleteId(key)
                  }}
                />
              </div>
            </li>
          })}
        </ul>
      </header>
    </div>
  );
}

// .btn {
//   backgroundColor

// }

export default Home;


