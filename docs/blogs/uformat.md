# Universal Formatter

**This was originally written November 4, 2024.**

I am someone who likes coming up with excuses to learn things. Recently, I took
over the infrastructure for a project at school, and used it as an avenue to
learn open source server software, such as Proxmox, which is a VM management
platform built on top of Debian. I also used this to implement local Git clients
such as Gitea, which I had never used before and got permission to install and
use as our primary local Git provider for the project. And I find this exciting!
Learning things through hands-on practice and experience and just kind of
jumping into it without any knowledge, while risky and sometimes overwhelming,
can be so rewarding.

Despite running these projects and having plenty on my plate with a masters
degree, I still got bored. I get bored easily it turns out, and often need
something interesting to play with or I just lounge around not doing anything.

I had wanted to learn Go for a while. At an internship I did this past summer, I
had an excellent excuse to learn it, as they were planning on putting us on a
project that would utilize it while also giving us plenty of room to learn the
language. However, due to a last minute switch up, I got placed onto an AI
project that, due to the nature of AI development tools, was written in Python.
Don't get me wrong, I still learned a lot! But the massive learning curve of
trying to figure out Go in the span of 12 weeks while also designing an
enterprise-grade product was taken away from me at the final moment. Alas, I was
instead required to learn a bunch of tiny new things I would then carry with me
into all future projects I designed and also would incorporate into my home lab
(that still isn't done yet but I have plans). Trade offs.

uformat, as I chose to name it, was the excuse I needed to learn Go. Initially,
I was going to try and write this in Rust, as I had with my other CLI
application "Time Converter". However, after doing research, and finding out
that Go would likely be easier and even better in some ways, I caved in, and
learned Go.

I would start out with some basic training and labs, most notably
[gobyexample](https://gobyexample.com), which is an excellent resource that I
would often go back to even while writing the project. There were also some
example projects I would run through to get used to the syntax and stuff like
that. One thing I found with learning a programming language is that, often
times, once you know one language you can kinda grasp them all. The logic of
programming languages are often very similar, regardless of what you're
developing, and Go was no exception to this. I figured out fairly quickly how
things were meant to work, and started!

The first "Init" commit was the product of waking up one morning, having
breakfast, putting on loungewear my partner got me, and sitting there writing
code for probably like 10 hours. It was a lot. May have given myself a headache
afterwards. Ouch.

I wanted to make sure that the project structure was right, and while there were
a lot of conflicting reports, I'm happy with the one I selected, and it keeps
things fairly tidy while also easy to find and understand. The only things I
wish I could improve in the future is probably splitting the "formatter" module
in two, as it has a lot of files and references that could probably go
elsewhere. Though hey, it works!

My goals for the project also extended beyond simply learning Go. I would also
use this project as an excuse to properly implement semantic versioning,
something I was scared of trying for longest time and even omitted completely
when developing "Time Converter". I wanted to commit to it and do it right, and
at v0.2.0, it seems to be working out okay. It certainly helps with the
implementation of the other thing I wanted to learn: package management!
Packages are weird, and as of writing `brew` is the only package manager I've
written for, but I've already taken note of resources to write both `deb` and
`rpm` packages, and will try to implement those soon (likely when I get that
home lab working...). But yay! This is honestly something I'm super excited
about. I had wanted an excuse to use these formats and mess with packages for a
while. This was a damn good excuse to, and it's helped! The version of `uformat`
I use on a daily basis is the version managed by `brew`. Handy!

Another thing was Makefiles. Makefiles are weird, and I wanted to experiment
more with them here, which I'm glad I got the chance to. Weird release format
aside, it does make my life easier, and Go's ability to seamlessly cross compile
is super handy. Much nicer than Rust's. While little testing has been done
outside of macOS, I did do some initial checks on Windows and it seemed to work
fine. Hoping I wrote all the OS code and logic right, though I did my best to
run everything with Go builtins, which are more likely to have the correct
support.

I wanted to fake it and pretend like I had a Computer Science degree. While I am
in Cybersecurity, which is close enough, I wanted to try and implement the
"proper" way to program and develop software, and ultimately, I feel like I got
pretty close to doing so with this project. I wanted to take the time to learn
the right ways rather than jumping in and guessing my way to the finish (like I
did with Rust...), and it worked really well. I'm an honest to god Go programmer
now! And I actually like it! I call that a success in my book, and I hope that I
use this language in the future to work on all kinds of little bits and bobs
both professionally and personally. It's a cool language that I feel pretty
comfortable in, and I seriously enjoyed programming this project. I hope I find
the time to continue working on it, and I hope that my goal of "designing
something I use myself" keeps with this. I mean, I've already implemented it
here in the repository storing this website, so I'd call that a pretty big
success. Tada!
