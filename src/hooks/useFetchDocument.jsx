import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export const useFetchDocument = (docColletion, id) => {

    const [document, setDocument] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // deal with memory leak
    const [cancelled, setCancelled] = useState(false);

    useEffect(() => {
        async function loadDocument() {
            if(cancelled) return;

            setLoading(true);

            try{
                const docRef = await doc(db, docColletion, id);
                const docSnap = await getDoc(docRef);

                setDocument(docSnap.data());

                setLoading(false);
            }catch(error){
                console.log(error)
                setError(error.message)

                setLoading(true);
            }

        }
        loadDocument();
    }, [docColletion, id, cancelled]);

    useEffect(() => {
        return () => setCancelled(true)
    }, [])

    return { document, loading, error };
}