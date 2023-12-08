function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        console.log(`Fetching data for user ${userId}...`);
        setTimeout(() => {
      // Simulating a successful server response
            const userData = {
            id: userId,
            name: 'John Doe',
            email: 'johndoe@example.com'
        };
        resolve(userData);
        }, 2000); // 2-second delay to simulate server response time
    });
}

function processUserData(userData) {
  return new Promise((resolve, reject) => {
    console.log('Processing user data...');
    setTimeout(() => {
      const processedData = {
        ...userData,
        name: userData.name.toUpperCase()
      };
      resolve(processedData);
    }, 1000); // 1-second delay to simulate processing time
  });
}

fetchUserData(123)
.then(userData => {
    return processUserData(userData);
})
.then(processedData => {
    console.log('Processed Data:', processedData);
})
.catch(error => {
    console.error('An error occurred:', error);
});