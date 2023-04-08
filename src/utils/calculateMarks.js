export const calculateMarks=(assignments)=>{

    const totalMarksByStudent = assignments.reduce((acc, cur) => {
        const key = `${cur.student_id}_${cur.student_name}`;
        if (acc[key]) {
            acc[key] += parseInt(cur.mark, 10); // or parseFloat(cur.mark) for floating-point numbers
        } else {
            acc[key] = parseInt(cur.mark, 10); // or parseFloat(cur.mark) for floating-point numbers
        }
        return acc;
    }, {});
    
    const students = Object.keys(totalMarksByStudent).map((key) => ({
        name: key.split("_")[1],
        totalMark: totalMarksByStudent[key],
        rank: null,
    }));
    
    students.sort((a, b) => b.totalMark - a.totalMark);

    //assign ranks to each student based on their position in the sorted array.
    let currentRank = 1;
    let previousMark = null;
    students.forEach((student, index) => {
        if (student.totalMark !== previousMark) {
        student.rank = currentRank;
        currentRank++;
        } else {
        student.rank = currentRank - 1;
        }
        previousMark = student.totalMark;
    });
    
    return students;
}