const BASE_URL = 'http://localhost:5000/api/jobs';

async function runTests() {
    console.log("🚀 Starting API Tests...\n");

    try {
        // 1. POST: Create a new job
        console.log("1. Testing POST /api/jobs...");
        const postRes = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: "Fix leaking pipe",
                description: "Pipe under the kitchen sink is leaking heavily.",
                category: "Plumbing",
                contactName: "John Doe",
                contactEmail: "john@example.com"
            })
        });
        const newJob = await postRes.json();
        console.log("✅ Created Job:", newJob._id || newJob.id, "\n");

        const jobId = newJob._id || newJob.id;

        // 2. GET: Fetch all jobs
        console.log("2. Testing GET /api/jobs...");
        const getRes = await fetch(BASE_URL);
        const jobs = await getRes.json();
        console.log(`✅ Found ${jobs.length} total jobs.\n`);

        // 3. GET: Fetch with filter
        console.log("3. Testing GET /api/jobs?category=Plumbing...");
        const filterRes = await fetch(`${BASE_URL}?category=Plumbing`);
        const filteredJobs = await filterRes.json();
        console.log(`✅ Found ${filteredJobs.length} plumbing jobs.\n`);

        // 4. PATCH: Update status
        console.log(`4. Testing PATCH /api/jobs/${jobId}...`);
        const patchRes = await fetch(`${BASE_URL}/${jobId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: "In Progress" })
        });
        const updatedJob = await patchRes.json();
        console.log("✅ Updated Status to:", updatedJob.status, "\n");

        // 5. DELETE: Remove the job
        console.log(`5. Testing DELETE /api/jobs/${jobId}...`);
        const deleteRes = await fetch(`${BASE_URL}/${jobId}`, { method: 'DELETE' });
        if (deleteRes.ok) {
            console.log("✅ Successfully deleted job.\n");
        }

        console.log("🎉 ALL TESTS PASSED!");

    } catch (error) {
        console.error("❌ Test failed:", error.message);
    }
}

runTests();