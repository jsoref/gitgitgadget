// This test script might take quite a while to run
jest.setTimeout(60000);

const expectedMails = [
    `From 566155e00ab72541ff0ac21eab84d087b0e882a5 Mon Sep 17 00:00:00 2001
Message-Id: <pull.<Message-ID>>
From: GitGitGadget <gitgitgadget@example.com>
Date: <Cover-Letter-Date>
Subject: [PATCH 0/3] My first Pull Request!
Fcc: Sent
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
MIME-Version: 1.0
To: reviewer@example.com
Cc: Some Body <somebody@example.com>

This Pull Request contains some really important changes that I would love to
have included in git.git.

Contributor (1):
  B

Developer (1):
  C

GitGitGadget (1):
  A

 A.t | 1 +
 B.t | 1 +
 C.t | 1 +
 3 files changed, 3 insertions(+)
 create mode 100644 A.t
 create mode 100644 B.t
 create mode 100644 C.t


base-commit: 0ae4d8d45ce43d7ad56faff2feeacf8ed5293518
--${" "}
2.17.0.windows.1
`, `From 44e454a6c1acb125e95d3ba9f57242445fb6beeb Mon Sep 17 00:00:00 2001
Message-Id: <44e454a6c1acb125e95d3ba9f57242445fb6beeb.<Message-ID>>
In-Reply-To: <pull.<Message-ID>>
References: <pull.<Message-ID>>
From: GitGitGadget <gitgitgadget@example.com>
Date: Fri, 13 Feb 2009 23:33:30 +0000
Subject: [PATCH 1/3] A
Fcc: Sent
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
MIME-Version: 1.0
To: reviewer@example.com
Cc: Some Body <somebody@example.com>

---
 A.t | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 A.t

diff --git a/A.t b/A.t
new file mode 100644
index 0000000..8c7e5a6
--- /dev/null
+++ b/A.t
@@ -0,0 +1 @@
+A
\\ No newline at end of file
--${" "}
2.17.0.windows.1

`, `From 0f7ccd74ef817f36e77c07eb918ebee41f6ab9e7 Mon Sep 17 00:00:00 2001
Message-Id: <0f7ccd74ef817f36e77c07eb918ebee41f6ab9e7.<Message-ID>>
In-Reply-To: <pull.<Message-ID>>
References: <pull.<Message-ID>>
From: "Contributor via GitGitGadget" <gitgitgadget@example.com>
Date: Fri, 13 Feb 2009 23:34:30 +0000
Subject: [PATCH 2/3] B
Fcc: Sent
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
MIME-Version: 1.0
To: reviewer@example.com
Cc: Some Body <somebody@example.com>
Cc: Contributor <contributor@example.com>

From: Contributor <contributor@example.com>

---
 B.t | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 B.t

diff --git a/B.t b/B.t
new file mode 100644
index 0000000..7371f47
--- /dev/null
+++ b/B.t
@@ -0,0 +1 @@
+B
\\ No newline at end of file
--${" "}
2.17.0.windows.1

`, `From 566155e00ab72541ff0ac21eab84d087b0e882a5 Mon Sep 17 00:00:00 2001
Message-Id: <566155e00ab72541ff0ac21eab84d087b0e882a5.<Message-ID>>
In-Reply-To: <pull.<Message-ID>>
References: <pull.<Message-ID>>
From: "Contributor via GitGitGadget" <gitgitgadget@example.com>
Date: Fri, 13 Feb 2009 23:35:30 +0000
Subject: [PATCH 3/3] C
Fcc: Sent
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit
MIME-Version: 1.0
To: reviewer@example.com
Cc: Some Body <somebody@example.com>
Cc: Developer <developer@example.com>

From: Developer <developer@example.com>

---
 C.t | 1 +
 1 file changed, 1 insertion(+)
 create mode 100644 C.t

diff --git a/C.t b/C.t
new file mode 100644
index 0000000..96d80cd
--- /dev/null
+++ b/C.t
@@ -0,0 +1 @@
+C
\\ No newline at end of file
--${" "}
2.17.0.windows.1
`,
];

        description,
        "gitgitgadget:next", baseCommit,
        "somebody:master", headCommit);
    const midRegex = new RegExp("<(pull|[0-9a-f]{40})"
        + "\\.\\d+(\\.v\\d+)?\\.git\\.gitgitgadget@example\\.com>", "g");
    expect(mails[0]).toMatch(/Range-diff vs v1:\n[^]*\n -: .* 4: /);
    expect(await revParse("pr-1/somebody/master-v2", workDir)).toBeDefined();

    expect(await notes.get(pullRequestURL)).toEqual({
        baseCommit,
        baseLabel: "gitgitgadget:next",
        coverLetterMessageId: "pull.1.v2.git.gitgitgadget@example.com",
        headCommit: headCommit2,
        headLabel: "somebody:master",
        iteration: 2,
        pullRequestURL,
        referencesMessageIds: [
            "pull.1.git.gitgitgadget@example.com",
        ],
    } as IPatchSeriesMetadata);