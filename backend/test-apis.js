const baseUrl = "http://localhost:8000";

const tests = [
  // Gateway GET requests for the new microservices
  { name: "Donation Listing", method: "GET", url: "/donate" },
  { name: "Grooming Listing", method: "GET", url: "/grooming" },
  { name: "Veterinary Listing", method: "GET", url: "/vet" },
  { name: "Training Listing", method: "GET", url: "/training" },
  { name: "Blog Listing", method: "GET", url: "/blog" },
  { name: "Store Listing", method: "GET", url: "/store" },
  
  // POST requests to simulate inserting data / booking
  { 
    name: "Add Donation", 
    method: "POST", 
    url: "/donate",
    body: { donorName: "John Doe", amount: 100, message: "For the dogs!" }
  },
  { 
    name: "Book Groomer", 
    method: "POST", 
    url: "/grooming/book",
    body: { groomerId: "dummy-id", date: new Date().toISOString() }
  },
  { 
    name: "Book Vet Appointment", 
    method: "POST", 
    url: "/vet/book",
    body: { vetId: "dummy-id", date: new Date().toISOString() }
  },
  { 
    name: "Enroll in Training", 
    method: "POST", 
    url: "/training/enroll",
    body: { courseId: "dummy-id", userId: "guest" }
  },
  { 
    name: "Place Store Order", 
    method: "POST", 
    url: "/store/order",
    body: { items: ["dummy-item"], totalAmount: 50.99 }
  }
];

async function runTests() {
  console.log("🐾 Starting comprehensive API Tests for Wagging Wonders...\n");
  let passed = 0;
  
  for (const test of tests) {
    try {
      const options = {
        method: test.method,
        headers: { "Content-Type": "application/json" }
      };

      if (test.body) {
        options.body = JSON.stringify(test.body);
      }

      const res = await fetch(`${baseUrl}${test.url}`, options);
      const data = await res.json();
      
      if (res.ok && data.success !== false) {
        console.log(`✅ [PASS] ${test.method} ${test.name} (${test.url})`);
        passed++;
      } else {
        console.error(`❌ [FAIL] ${test.method} ${test.name} (${test.url}) - Error: ${data.message || res.statusText}`);
      }
    } catch (e) {
      console.error(`❌ [ERROR] ${test.method} ${test.name} (${test.url}) - Unable to connect or gateway returned bad response.`);
      console.error("   Details:", e.message);
    }
    
    // Slight delay between requests to avoid overwhelming
    await new Promise(resolve => setTimeout(resolve, 200));
  }
  
  console.log(`\n🎉 Test Summary: ${passed}/${tests.length} API endpoints successfully tested and verified!`);
}

runTests();
