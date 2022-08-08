import { SimpleGitAPI } from "../../simple-git-api";

 test("Test git commit count",async ()=>{
	let gitApi=new SimpleGitAPI("testDir/");
	let commits =await gitApi.getCommits();
	expect(commits.length).toBe(2);

});


