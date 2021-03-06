/**
 * @license
 * Copyright 2016 Palantir Technologies, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as ts from "typescript";
import * as Lint from "../lint";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "<reference> is not allowed, use imports";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoReferenceWalker(sourceFile, this.getOptions()));
    }
}

class NoReferenceWalker extends Lint.RuleWalker {
    public visitSourceFile(node: ts.SourceFile) {
        for (let ref of node.referencedFiles) {
            this.addFailure(this.createFailure(ref.pos, ref.end - ref.pos, Rule.FAILURE_STRING));
        }
    }
}
