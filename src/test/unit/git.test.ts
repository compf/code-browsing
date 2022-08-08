import { SimpleGitAPI } from "../../simple-git-api";
const SIMPLE_COMMIT_PATH="testDir/simpleCommits";
 test("Test git commit count",async ()=>{
	let gitApi=new SimpleGitAPI(SIMPLE_COMMIT_PATH);
	let commits =await gitApi.getCommits();
	expect(commits.length).toBe(2);

});
test ("Test git backwards, forward",async ()=>{
	const SECOND_COMMIT="8cc7df233cc2f148207a1d84f03f8155cbe82347";
	const FIRST_COMMIT="0605baf1cbf421d8bf58823658466e1e2c3384b2";
	let gitApi=new SimpleGitAPI(SIMPLE_COMMIT_PATH);
	expect( (await gitApi.getCurrCommit()).value.hash).toBe(SECOND_COMMIT);
	let successful=await gitApi.backward();
	expect(successful).toBeTruthy();
	expect( (await gitApi.getCurrCommit()).value.hash).toBe(FIRST_COMMIT);
	successful=await gitApi.forward();
	expect(successful).toBeTruthy();
	expect( (await gitApi.getCurrCommit()).value.hash).toBe(SECOND_COMMIT);
});


